import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import QuotationCard from "../components/cards/QuotationCard";

import {
  getQuotations,
  acceptQuotation,
} from "../api/quotationApi";

import {
  FileText,
  Users,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

import { toast } from "react-toastify";

function RequestDetails() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [quotations, setQuotations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [acceptingId, setAcceptingId] =
    useState(null);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations =
    async () => {
      try {
        const response =
          await getQuotations(id);

        setQuotations(
          response.data || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load quotations"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleAccept =
    async (quotationId) => {
      try {
        setAcceptingId(
          quotationId
        );

        await acceptQuotation(
          quotationId
        );

        toast.success(
          "Quotation Accepted"
        );

        navigate(
          "/tracking"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to accept quotation"
        );
      } finally {
        setAcceptingId(null);
      }
    };

  const lowestPrice =
    quotations.length > 0
      ? Math.min(
          ...quotations.map(
            (q) =>
              q.amount || 0
          )
        )
      : 0;

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-black text-white">
          Quotations
        </h1>

        <p className="text-slate-400 mt-2">
          Compare quotations and
          choose the best mechanic
        </p>

      </div>

      {/* Statistics */}

      {!loading &&
        quotations.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    Total Quotes
                  </p>

                  <h3 className="text-3xl font-black text-white mt-2">
                    {
                      quotations.length
                    }
                  </h3>
                </div>

                <Users className="text-orange-500" />
              </div>

            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    Lowest Price
                  </p>

                  <h3 className="text-3xl font-black text-green-400 mt-2">
                    ₹
                    {
                      lowestPrice
                    }
                  </h3>
                </div>

                <IndianRupee className="text-green-400" />
              </div>

            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    Status
                  </p>

                  <h3 className="text-xl font-bold text-orange-400 mt-2">
                    Awaiting Selection
                  </h3>
                </div>

                <CheckCircle className="text-orange-400" />
              </div>

            </div>

          </div>
        )}

      {/* Loading */}

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-72
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                "
              />
            )
          )}

        </div>
      ) : quotations.length === 0 ? (

        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-12
            text-center
          "
        >

          <FileText
            size={60}
            className="
              mx-auto
              text-orange-500
              mb-4
            "
          />

          <h2 className="text-3xl font-bold text-white">
            No Quotations Yet
          </h2>

          <p className="text-slate-400 mt-3">
            Mechanics haven't
            submitted quotations yet.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {quotations.map(
            (quotation) => (
              <QuotationCard
                key={
                  quotation._id
                }
                quotation={
                  quotation
                }
                onAccept={
                  handleAccept
                }
                loading={
                  acceptingId ===
                  quotation._id
                }
              />
            )
          )}

        </div>

      )}

    </DashboardLayout>
  );
}

export default RequestDetails;