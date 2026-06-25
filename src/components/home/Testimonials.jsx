import { motion } from "framer-motion";
import {
  Star,
  Quote,
} from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Car Owner",
    image:
      "https://i.pravatar.cc/150?img=11",
    review:
      "My car broke down at midnight. ResQ connected me with a mechanic in minutes. Amazing experience.",
  },
  {
    name: "Priya Singh",
    role: "Traveler",
    image:
      "https://i.pravatar.cc/150?img=32",
    review:
      "The live tracking feature was fantastic. I knew exactly when help would arrive.",
  },
  {
    name: "Amit Kumar",
    role: "Bike Rider",
    image:
      "https://i.pravatar.cc/150?img=15",
    review:
      "Professional mechanics, fast response and transparent pricing. Highly recommended.",
  },
];

function Testimonials() {
  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[150px]" />

      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-20"
        >
          <span className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-orange-500/10
            border
            border-orange-500/20
            text-orange-400
            text-sm
            mb-6
          ">
            Customer Reviews
          </span>

          <h2 className="
            text-4xl
            md:text-6xl
            font-black
            text-white
          ">
            What Customers Say
          </h2>

          <p className="
            mt-6
            max-w-2xl
            mx-auto
            text-slate-400
            text-lg
          ">
            Trusted by thousands of vehicle
            owners for fast and reliable roadside
            assistance.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {testimonials.map(
            (testimonial, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay:
                    index * 0.15,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  relative
                "
              >

                {/* Quote Icon */}
                <div className="
                  absolute
                  top-6
                  right-6
                  text-orange-500/20
                ">
                  <Quote size={40} />
                </div>

                {/* Stars */}
                <div className="
                  flex
                  gap-1
                  mb-5
                ">
                  {[...Array(5)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="
                          text-yellow-400
                          fill-yellow-400
                        "
                      />
                    )
                  )}
                </div>

                {/* Review */}
                <p className="
                  text-slate-300
                  leading-relaxed
                  mb-8
                ">
                  "{testimonial.review}"
                </p>

                {/* User */}
                <div className="
                  flex
                  items-center
                  gap-4
                ">

                  <img
                    src={
                      testimonial.image
                    }
                    alt={
                      testimonial.name
                    }
                    className="
                      w-14
                      h-14
                      rounded-full
                      border
                      border-white/10
                    "
                  />

                  <div>

                    <h4 className="
                      text-white
                      font-semibold
                    ">
                      {
                        testimonial.name
                      }
                    </h4>

                    <p className="
                      text-slate-400
                      text-sm
                    ">
                      {
                        testimonial.role
                      }
                    </p>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;