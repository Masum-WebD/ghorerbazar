import { API_BASE_URL } from "./config";

export interface ShippingRate {
  id: number;
  name: string;
  description: string;
  is_dhaka_conditional: boolean;
  half_kg_rate: string;
  first_kg_rate: string;
  subsequent_kg_rate: string;
  inside_dhaka_half_kg_rate: string;
  inside_dhaka_first_kg_rate: string;
  inside_dhaka_subsequent_kg_rate: string;
  outside_dhaka_half_kg_rate: string;
  outside_dhaka_first_kg_rate: string;
  outside_dhaka_subsequent_kg_rate: string;
}

export interface ShippingRatesResponse {
  success: boolean;
  shipping_rates: ShippingRate[];
}

export interface PaymentMethod {
  id: number;
  name: string;
  icon: string | null;
  number: string | null;
  short_description: string;
  description: string | null;
  steps: string[];
  image: string | null;
  status: boolean;
}

export interface PaymentMethodsResponse {
  success: boolean;
  message: string;
  data: PaymentMethod[];
}


export interface Coupon {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  min_order_amount: number;
  expire_date: string | null;
}

export interface GetCouponsResponse {
  success: boolean;
  coupons: Coupon[];
}

export interface ApplyCouponResponse {
  success: boolean;
  message: string;
  discount: number;
  coupon?: {
    id: number;
    code: string;
    type: string;
    value: number;
    min_order_amount: number;
  };
}

export interface CartProductInput {
  product_id: number;
  variant_id?: number | null;
  quantity: number;
  price: number;
}

export interface PlaceOrderPayload {
  customer_id?: number;
  phone: string;
  name: string;
  address: string;
  country?: string;
  secondary_phone?: string;
  email?: string;
  note?: string;
  coupon_code?: string;
  ref_code?: string;
  delivery_method: string;
  courier_charge: number;
  payment_method: string;
  payment_account_no?: string;
  transaction_no?: string;
  products: Array<{
    product_id: number;
    variant_id: number | null;
    quantity: number;
    price: number;
  }>;
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  order: {
    id: number;
    order_no: string;
    order_type: string;
    customer_id: number;
    date: string;
    payment_type: string;
    bank_name: string;
    bank_account_no: string | null;
    transaction_no: string | null;
    sale_amount: number;
    courier_charge: number;
    total_amount: number;
    advance_amount: number;
    due_amount: number;
    status: string;
    coupon_id: number | null;
    coupon_code: string | null;
    discount_amount: number;
    secondary_phone: string | null;
    country: string;
    shipping_address: string;
    created_at: string;
    updated_at: string;
    items: Array<{
      id: number;
      order_id: number;
      product_id: number;
      product_variant_id: number | null;
      product_name: string;
      price: string;
      quantity: number;
      total: string;
    }>;
  };
  customer?: any;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  secondary_phone: string | null;
}

export interface CustomerDetailsResponse {
  success: boolean;
  customer?: CustomerDetails;
  message?: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────



/** Fetch customer details by phone. */
export async function getCustomerByPhone(
  phone: string
): Promise<CustomerDetailsResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customer/by-phone?phone=${encodeURIComponent(phone)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  const json = await res.json();
  if (!res.ok && res.status !== 404) {
      throw new Error(json.message || "Failed to fetch customer details");
  }
  return json;
}



/** Verify and apply a coupon to the current cart. */
export async function applyCoupon(
  couponCode: string,
  phone: string,
  products: CartProductInput[]
): Promise<ApplyCouponResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/checkout/apply-coupon`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        coupon_code: couponCode,
        phone,
        products,
      }),
    }
  );
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Coupon is invalid or cannot be applied");
  return json;
}

/** Place an order. */
export async function placeOrder(
  payload: PlaceOrderPayload | FormData,
  token?: string | null
): Promise<PlaceOrderResponse> {
  const headers: any = {
    Accept: "application/json",
  };
  
  if (!(payload instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${API_BASE_URL}/api/v1/checkout/place-order`,
    {
      method: "POST",
      headers,
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    }
  );
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to place order");
  return json;
}

export const getShippingRates = async (): Promise<ShippingRatesResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/shipping-rates/active`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch shipping rates");
  return json;
};

export const calculateShippingCharge = (
  rate: ShippingRate,
  totalWeight: number,
  isDhaka: boolean
): number => {
  let halfKgRate: number;
  let firstKgRate: number;
  let subsequentKgRate: number;

  if (rate.is_dhaka_conditional) {
    if (isDhaka) {
      halfKgRate = parseFloat(rate.inside_dhaka_half_kg_rate);
      firstKgRate = parseFloat(rate.inside_dhaka_first_kg_rate);
      subsequentKgRate = parseFloat(rate.inside_dhaka_subsequent_kg_rate);
    } else {
      halfKgRate = parseFloat(rate.outside_dhaka_half_kg_rate);
      firstKgRate = parseFloat(rate.outside_dhaka_first_kg_rate);
      subsequentKgRate = parseFloat(rate.outside_dhaka_subsequent_kg_rate);
    }
  } else {
    halfKgRate = parseFloat(rate.half_kg_rate);
    firstKgRate = parseFloat(rate.first_kg_rate);
    subsequentKgRate = parseFloat(rate.subsequent_kg_rate);
  }

  if (totalWeight <= 0.5) {
    return halfKgRate;
  } else if (totalWeight <= 1) {
    return firstKgRate;
  } else {
    return firstKgRate + Math.ceil(totalWeight - 1) * subsequentKgRate;
  }
};

export const getPaymentMethods = async (): Promise<PaymentMethodsResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/payment-methods`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch payment methods");
  return json;
};
