'use client';

import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { fetchWithdrawals, createWithdrawal, Withdrawal, fetchPayoutDetails, fetchAffiliateSettings } from "@/lib/api/affiliate";
import { Wallet, Clock, CheckCircle, BanknoteIcon, Loader2, RefreshCw, AlertTriangle, Filter, Settings, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

const AffiliatePayouts = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [perPage, setPerPage] = useState("50");
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["affiliate-withdrawals", statusFilter, startDate, endDate, perPage, orderBy],
    queryFn: () => fetchWithdrawals(token!, {
      status: statusFilter,
      start_date: startDate,
      end_date: endDate,
      per_page: perPage,
      order_by: orderBy
    }),
    enabled: !!token,
  });

  const { data: payoutDetailsData, isLoading: isLoadingPayoutDetails } = useQuery({
    queryKey: ["affiliate-payout-details"],
    queryFn: () => fetchPayoutDetails(token!),
    enabled: !!token, // Fetch on page load to check if set
  });

  const { data: settingsData, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["affiliate-settings-content"],
    queryFn: () => fetchAffiliateSettings(token!),
    enabled: !!token,
  });

  const requestMutation = useMutation({
    mutationFn: (amount: number) => createWithdrawal(token!, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate-withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["affiliate-dashboard"] }); // Update available balance everywhere
      toast.success("Withdrawal request submitted successfully!");
      setIsRequestModalOpen(false);
      setWithdrawAmount("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit withdrawal request.");
    },
  });

  const stats = data?.data?.stats;
  const withdrawals = data?.data?.withdrawals?.data || [];
  const payoutDetails = payoutDetailsData?.data;
  const settings = settingsData?.data;
  const minimumWithdrawAmount = settings?.minimum_withdraw_amount || 0;

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount < minimumWithdrawAmount) {
      toast.error(`Minimum withdrawal amount is ৳${minimumWithdrawAmount}`);
      return;
    }

    if (amount > (stats?.available_balance || 0)) {
      toast.error("You cannot withdraw more than your available balance");
      return;
    }

    requestMutation.mutate(amount);
  };

  // Clear filters
  const resetFilters = () => {
    setStatusFilter("");
    setStartDate("");
    setEndDate("");
    setPerPage("50");
    setOrderBy("desc");
  };

  const hasLowBalance = (stats?.available_balance || 0) < minimumWithdrawAmount;
  const canRequest = !hasLowBalance && payoutDetails;

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Withdrawals</h1>
          <p className="text-gray-500 mt-1">Track your commission payouts and withdrawal history</p>
        </div>

        {canRequest ? (
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 transform hover:-translate-y-0.5"
          >
            <BanknoteIcon size={18} />
            Request Withdrawal
          </button>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 px-5 py-3 bg-gray-300 text-white text-sm font-bold rounded-xl cursor-not-allowed opacity-70 shadow-sm"
          >
            <BanknoteIcon size={18} />
            Request Withdrawal
          </button>
        )}
      </div>

      {!isLoading && !isLoadingSettings && (
        <>
          {hasLowBalance ? (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle size={28} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-red-900 mb-1">Insufficient Balance</h3>
                <p className="text-sm text-red-700">
                  You need a minimum balance of <strong className="font-bold">৳{minimumWithdrawAmount}</strong> to request a withdrawal. Your current balance is <strong className="font-bold">৳{stats?.available_balance || 0}</strong>.
                </p>
              </div>
            </div>
          ) : (!isLoadingPayoutDetails && !payoutDetails && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle size={28} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-amber-900 mb-1">Payout Details Required</h3>
                <p className="text-sm text-amber-700">
                  You must set up your payout method and account details before you can request any withdrawals.
                </p>
              </div>
              <Link
                href="/dashboard/affiliate/payout-details"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white text-sm font-bold rounded-xl hover:bg-amber-700 transition-all shadow-md shadow-amber-600/20 transform hover:-translate-y-0.5"
              >
                <Settings size={18} /> Configure Now
              </Link>
            </div>
          ))}
        </>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Available Balance"
          value={isLoading ? "..." : `৳${stats?.available_balance?.toLocaleString() || "0"}`}
          change="Ready to withdraw"
          changeType="positive"
          icon={Wallet}
          iconColor="text-emerald-600"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm shadow-emerald-100"
        />
        <StatCard
          title="Pending Withdrawals"
          value={isLoading ? "..." : `৳${stats?.pending_amount?.toLocaleString() || "0"}`}
          change="Currently processing"
          changeType="neutral"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-sm shadow-amber-100"
        />
        <StatCard
          title="Total Paid Out"
          value={isLoading ? "..." : `৳${stats?.paid_amount?.toLocaleString() || "0"}`}
          change="Successfully withdrawn"
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-blue-600"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm shadow-blue-100"
        />
        <StatCard
          title="Total Requests"
          value={isLoading ? "..." : stats?.total_withdrawals?.toString() || "0"}
          change="Lifetime requests"
          changeType="neutral"
          icon={RefreshCw}
          iconColor="text-purple-600"
          iconBg="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-sm shadow-purple-100"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Filter size={16} className="text-primary-600" />
          Filter Withdrawals
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-gray-50/50 rounded-xl border-gray-200">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 px-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all text-gray-700"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 px-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all text-gray-700"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Order By</label>
            <Select value={orderBy} onValueChange={(val: any) => setOrderBy(val)}>
              <SelectTrigger className="w-full bg-gray-50/50 rounded-xl border-gray-200">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Per Page</label>
            <Select value={perPage} onValueChange={setPerPage}>
              <SelectTrigger className="w-full bg-gray-50/50 rounded-xl border-gray-200">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {(statusFilter || startDate || endDate || perPage !== "50" || orderBy !== "desc") && (
          <div className="flex justify-end pt-2 border-t border-gray-50">
            <button
              onClick={resetFilters}
              className="text-xs font-medium text-red-500 hover:text-red-600 hover:underline transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <>
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div></th>
                  <th className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div></th>
                  <th className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div></th>
                  <th className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></th>
                  <th className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-28 animate-pulse"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-32 animate-pulse"></div></td>
                    <td className="py-4 px-6"><div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                    <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm relative overflow-hidden animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-40"></div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <div className="h-3 bg-gray-100 rounded w-32"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Payouts Table - Desktop */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200">
                    <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wider py-4 px-6">Withdrawal ID</th>
                    <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wider py-4 px-6">Requested Date</th>
                    <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wider py-4 px-6">Updated At</th>
                    <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wider py-4 px-6">Amount</th>
                    <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wider py-4 px-6">Status</th>
                    <th className="text-right text-xs font-bold text-gray-600 uppercase tracking-wider py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {withdrawals.length > 0 ? (
                    withdrawals.map((w: Withdrawal) => (
                      <tr key={w.id} className="hover:bg-primary-50/30 transition-colors group">
                        <td className="py-4 px-6 text-sm font-semibold text-primary-700">WD-{w.id.toString().padStart(4, '0')}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{new Date(w.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{new Date(w.updated_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">৳{w.amount.toLocaleString()}</td>
                        <td className="py-4 px-6"><StatusBadge status={w.status as any} /></td>
                        <td className="py-4 px-6 text-right">
                          <Link href={`/dashboard/affiliate/payouts/${w.id}/invoice`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <ExternalLink size={14} />
                            Invoice
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <BanknoteIcon size={48} className="text-gray-200 mb-3" />
                          <p className="text-base font-medium text-gray-900 mb-1">No withdrawals found</p>
                          <p className="text-sm">Try adjusting your filters or request a new withdrawal.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {withdrawals.length > 0 ? (
              withdrawals.map((w: Withdrawal) => (
                <div key={w.id} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary-700">WD-{w.id.toString().padStart(4, '0')}</span>
                    <StatusBadge status={w.status as any} />
                  </div>
                  <p className="text-xs text-gray-500">Requested: {new Date(w.created_at).toLocaleDateString()}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Updated: {new Date(w.updated_at).toLocaleDateString()}</span>
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/affiliate/payouts/${w.id}/invoice`} className="text-xs font-medium text-primary-600 hover:underline flex items-center gap-1">
                        Invoice <ExternalLink size={12} />
                      </Link>
                      <span className="text-base font-bold text-gray-900">৳{w.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center flex flex-col items-center justify-center">
                <BanknoteIcon size={40} className="text-gray-200 mb-3" />
                <p className="text-gray-900 font-medium">No withdrawals found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Request Withdrawal Modal */}
      {payoutDetails && (
        <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
          <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Wallet className="opacity-80" /> Request Withdrawal
                </DialogTitle>
              </DialogHeader>
              <p className="text-primary-100 text-sm mt-2 opacity-90">
                Withdraw your available earnings directly to your configured payout method.
              </p>
            </div>

            <div className="p-6 bg-white">
              <form onSubmit={handleRequestWithdrawal} className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-inner">
                  <span className="text-sm font-semibold text-gray-600">Available Balance:</span>
                  <span className="text-xl font-extrabold text-emerald-600">৳{stats?.available_balance?.toLocaleString() || "0"}</span>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Sending To:</p>
                  <div className="flex items-center gap-2 text-sm text-blue-900">
                    <span className="font-semibold">{payoutDetails.method_name}</span>
                    <span className="opacity-50">•</span>
                    <span className="font-mono">{payoutDetails.account_details}</span>
                  </div>
                  <Link
                    href="/dashboard/affiliate/payout-details"
                    onClick={() => setIsRequestModalOpen(false)}
                    className="text-xs text-blue-600 hover:underline mt-2 inline-flex items-center gap-1"
                  >
                    Change Method <ExternalLink size={10} />
                  </Link>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 flex justify-between">
                    <span>Amount to Withdraw (৳) <span className="text-red-500">*</span></span>
                    {isLoadingSettings ? (
                      <span className="text-gray-400 text-xs font-normal">Loading...</span>
                    ) : (
                      <span className="text-gray-500 text-xs font-normal">Min: ৳{minimumWithdrawAmount}</span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">৳</span>
                    <input
                      type="number"
                      placeholder={`e.g. ${minimumWithdrawAmount > 0 ? minimumWithdrawAmount : 1000}`}
                      required
                      min={minimumWithdrawAmount}
                      max={stats?.available_balance || 0}
                      step="0.01"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 duration-300 rounded-xl text-base font-semibold text-gray-800 focus:border-primary outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Enter an amount up to your available balance.</p>
                </div>

                <DialogFooter className="pt-4 border-t border-gray-100 sm:justify-between flex-row items-center">
                  <DialogClose asChild>
                    <button type="button" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    type="submit"
                    disabled={
                      requestMutation.isPending ||
                      isLoadingSettings ||
                      !stats ||
                      stats.available_balance < minimumWithdrawAmount ||
                      parseFloat(withdrawAmount || "0") > stats.available_balance ||
                      parseFloat(withdrawAmount || "0") < minimumWithdrawAmount
                    }
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary-500/20"
                  >
                    {requestMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                    {requestMutation.isPending ? "Processing..." : "Confirm Withdrawal"}
                  </button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AffiliatePayouts;
