'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useSettings } from "@/providers/SettingsProvider";
import { fetchCustomerOrder, OrderDetail } from "@/lib/api/customer";
import { toast } from "sonner";

export default function CustomerInvoice() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { token, isLoading } = useAuth();
  const { settings } = useSettings();
  const router = useRouter();
  
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!token) {
        setLoading(false);
        router.replace('/login');
        return;
    }
    if (!orderId) return;

    const loadOrder = async () => {
      setLoading(true);
      try {
        const res = await fetchCustomerOrder(token, orderId);
        setOrder(res.data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load order invoice");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [token, orderId, isLoading, router]);

  // Auto print when order is fully loaded
  useEffect(() => {
    if (!loading && order) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [loading, order]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-500">
          <Loader2 className="animate-spin mx-auto text-primary mb-3" size={32} />
          <p>Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-gray-900">Invoice Not Found</h2>
          <p className="text-gray-500 mt-2">The invoice you're looking for doesn't exist.</p>
          <Link href={`/dashboard/customer/orders`} className="inline-flex items-center gap-2 mt-6 text-primary hover:underline">
            <ArrowLeft size={16} /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 0; }
          body { padding: 1cm; }
        }
      `}} />
      <div className="bg-gray-50 py-8 px-4 print:py-0 print:px-0 print:bg-white rounded-2xl">
        {/* Top Bar (Hidden in Print) */}
        <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
          <Link 
            href={`/dashboard/customer/orders/${orderId}`} 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back to Order
          </Link>
          <button 
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>

        {/* Invoice Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none">
          {/* Invoice Header */}
          <div className="p-8 md:p-12 border-b border-gray-100 bg-gray-50/50 print:bg-white print:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 print:flex-row print:items-start print:gap-4">
              <div>
                {settings?.logo_url ? (
                   /* eslint-disable-next-line @next/next/no-img-element */
                   <img src={settings.logo_url} alt={settings?.name || "SirajTech"} className="h-12 object-contain" />
                ) : (
                   <h1 className="text-3xl font-extrabold text-primary tracking-tight">{settings?.name || "SirajTech"}</h1>
                )}
                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                  Your trusted partner for agricultural and tech solutions in Bangladesh.
                </p>
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p>Email: {settings?.email || 'support@sirajtech.com'}</p>
                  <p>Phone: {settings?.mobile || '+880 1234-567890'}</p>
                </div>
              </div>
              <div className="md:text-right">
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">INVOICE</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between md:justify-end gap-8 text-sm">
                    <span className="text-gray-500">Invoice No:</span>
                    <span className="font-semibold text-gray-900">INV-{order.order_no}</span>
                  </div>
                  <div className="flex justify-between md:justify-end gap-8 text-sm">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-900">{order.date}</span>
                  </div>
                  <div className="flex justify-between md:justify-end gap-8 text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={`font-semibold ${['paid', 'completed'].includes(order.status?.toLowerCase()) ? 'text-green-600' : 'text-orange-600'}`}>
                      {order.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-8 md:p-12 print:p-6">
            {/* Billing & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 print:grid-cols-2 print:mb-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Billed / Shipped To:</h3>
                <p className="text-base font-bold text-gray-900">{order.shipping_address?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-1">{order.shipping_address?.address || 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-2 font-medium">Phone: {order.shipping_address?.phone || 'N/A'}</p>
              </div>
              <div className="md:text-right">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Payment Info:</h3>
                <p className="text-sm text-gray-900 font-medium">Method: {order.payment_type || 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-1">Transaction No: {(order as any).transaction_no || 'N/A'}</p>
              </div>
            </div>

            {/* Order Items Table */}
            <div className="overflow-x-auto mb-8 print:mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item Description</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Qty</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Price</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items?.map((item: any) => (
                    <tr key={item.id}>
                      <td className="py-4 px-4 print:py-2 flex items-center">
                        <div className="flex items-center">
                          {(item.thumbnail_url || item.product?.image_url || item.image) && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={item.thumbnail_url || item.product?.image_url || item.image}
                              alt={item.product_name}
                              className="w-12 h-12 object-cover rounded mr-4 border border-gray-200"
                            />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            {(item as any).variant && (
                              <p className="text-xs text-gray-500 mt-0.5">Variant: {(item as any).variant.name}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-700 print:py-2">{item.quantity}</td>
                      <td className="py-4 px-4 text-right text-sm text-gray-700 print:py-2">৳{Number(item.price).toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900 print:py-2">৳{Number(item.total).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex flex-col md:flex-row justify-end border-t-2 border-gray-100 pt-8 print:flex-row print:pt-4">
              <div className="w-full md:w-1/2 lg:w-1/3 space-y-3 print:w-1/2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="text-gray-900 font-medium">৳{Number(order.subtotal || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping (Courier):</span>
                  <span className="text-gray-900 font-medium">৳{Number(order.shipping || 0).toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount:</span>
                    <span className="text-red-600 font-medium">-৳{Number(order.discount).toLocaleString()}</span>
                  </div>
                )}
                {(order as any).manual_discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Manual Discount:</span>
                    <span className="text-red-600 font-medium">-৳{Number((order as any).manual_discount).toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-100 pt-3 mt-3">
                  <span>Total Amount:</span>
                  <span>৳{Number(order.total).toLocaleString()}</span>
                </div>
                
                {(order as any).advance_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-700 font-semibold border-t border-gray-100 pt-2 mt-2">
                    <span>Advance Received:</span>
                    <span>-৳{Number((order as any).advance_amount).toLocaleString()}</span>
                  </div>
                )}
                
                {((order as any).due_amount !== undefined && (order as any).due_amount > 0) && (
                  <div className="flex justify-between text-lg font-bold text-red-600 border-t border-gray-100 pt-2 mt-2">
                    <span>Due Amount:</span>
                    <span>৳{Number((order as any).due_amount).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-16 pt-8 border-t border-gray-100 text-center print:mt-12">
              <h4 className="text-gray-900 font-bold mb-2">Thank you for your business!</h4>
              <p className="text-sm text-gray-500">If you have any questions about this invoice, please contact support.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
