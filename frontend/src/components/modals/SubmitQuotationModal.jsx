import { useState } from "react";

import {
  X,
  IndianRupee,
  Clock3,
  Send,
  Wrench,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function SubmitQuotationModal({
  isOpen,
  onClose,
  onSubmit,
  requestId,
}) {
  const [formData, setFormData] =
    useState({
      amount: "",
      estimatedArrivalTime: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      requestId,
      amount: Number(
        formData.amount
      ),
      estimatedArrivalTime:
        Number(
          formData.estimatedArrivalTime
        ),
    });

    setFormData({
      amount: "",
      estimatedArrivalTime: "",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-md
            p-4
          "
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
              y: 30,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              w-full
              max-w-xl
              bg-slate-950/95
              backdrop-blur-2xl
              border
              border-white/10
              rounded-[32px]
              p-8
              overflow-hidden
            "
          >
            {/* Background Glow */}
            <div className="
              absolute
              top-0
              right-0
              w-64
              h-64
              bg-orange-500/10
              blur-[120px]
            " />

            {/* Header */}
            <div className="
              flex
              items-center
              justify-between
              mb-8
            ">
              <div className="
                flex
                items-center
                gap-4
              ">
                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-orange-500/10
                  flex
                  items-center
                  justify-center
                ">
                  <Wrench
                    size={30}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <h2 className="
                    text-3xl
                    font-black
                    text-white
                  ">
                    Submit Quotation
                  </h2>

                  <p className="text-slate-400">
                    Send your service offer
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                  text-slate-400
                  hover:text-white
                  transition
                "
              >
                <X size={28} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Amount */}
              <div>
                <label className="
                  text-sm
                  text-slate-400
                  mb-2
                  block
                ">
                  Service Price
                </label>

                <div className="
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                ">
                  <IndianRupee
                    className="text-orange-500"
                    size={22}
                  />

                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter quotation amount"
                    value={formData.amount}
                    onChange={
                      handleChange
                    }
                    required
                    min="1"
                    className="
                      flex-1
                      bg-transparent
                      text-white
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* ETA */}
              <div>
                <label className="
                  text-sm
                  text-slate-400
                  mb-2
                  block
                ">
                  Estimated Arrival Time
                </label>

                <div className="
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                ">
                  <Clock3
                    className="text-blue-400"
                    size={22}
                  />

                  <input
                    type="number"
                    name="estimatedArrivalTime"
                    placeholder="Arrival time in minutes"
                    value={
                      formData.estimatedArrivalTime
                    }
                    onChange={
                      handleChange
                    }
                    required
                    min="1"
                    className="
                      flex-1
                      bg-transparent
                      text-white
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Preview Cards */}
              {(formData.amount ||
                formData.estimatedArrivalTime) && (
                <div className="
                  grid
                  grid-cols-2
                  gap-4
                ">
                  <div className="
                    bg-orange-500/10
                    border
                    border-orange-500/20
                    rounded-2xl
                    p-4
                    text-center
                  ">
                    <p className="
                      text-slate-400
                      text-sm
                    ">
                      Quotation
                    </p>

                    <h3 className="
                      text-2xl
                      font-bold
                      text-white
                      mt-1
                    ">
                      ₹
                      {formData.amount ||
                        0}
                    </h3>
                  </div>

                  <div className="
                    bg-blue-500/10
                    border
                    border-blue-500/20
                    rounded-2xl
                    p-4
                    text-center
                  ">
                    <p className="
                      text-slate-400
                      text-sm
                    ">
                      ETA
                    </p>

                    <h3 className="
                      text-2xl
                      font-bold
                      text-white
                      mt-1
                    ">
                      {
                        formData.estimatedArrivalTime ||
                        0
                      }
                      m
                    </h3>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  hover:from-orange-600
                  hover:to-orange-700
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-lg
                  shadow-orange-500/30
                  transition-all
                "
              >
                <Send size={18} />
                Submit Quotation
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SubmitQuotationModal;