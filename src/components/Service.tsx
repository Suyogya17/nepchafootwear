import { Factory, Package, Truck, ShieldCheck } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Factory,
      title: "Footwear Manufacturing",
      description:
        "High-quality footwear production built for durability, comfort, and market demand.",
      points: [
        "Modern designs",
        "Durable materials",
        "Consistent finishing",
      ],
    },
    {
      icon: Package,
      title: "Bulk Supply",
      description:
        "Reliable large-scale production to meet dealer and distributor requirements.",
      points: [
        "Bulk order support",
        "Scalable production",
        "Flexible quantities",
      ],
    },
    {
      icon: Truck,
      title: "Nationwide Distribution",
      description:
        "Efficient logistics and delivery ensuring timely supply across Nepal.",
      points: [
        "Fast delivery",
        "Reliable supply chain",
        "Dealer-focused logistics",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description:
        "Strict quality control processes to maintain product consistency and trust.",
      points: [
        "Material inspection",
        "Production standards",
        "Long-lasting products",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Built to Support
            <br />
            <span className="text-orange-500">Your Business Growth</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Nepcha provides end-to-end footwear manufacturing and supply solutions
            designed specifically for dealers, wholesalers, and retail businesses.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 transition duration-300"
            >
              {/* ICON */}
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-orange-400" />
              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* POINTS */}
              <ul className="space-y-2">
                {service.points.map((point, i) => (
                  <li key={i} className="text-sm text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SIMPLE PROCESS (B2B FLOW) */}
        <div className="mt-24">
          <h3 className="text-3xl font-semibold mb-12">
            How We Work With Dealers
          </h3>

          <div className="grid md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">01</div>
              <p className="text-gray-400">Inquiry & Requirement</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">02</div>
              <p className="text-gray-400">Product Selection</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">03</div>
              <p className="text-gray-400">Production & Packaging</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">04</div>
              <p className="text-gray-400">Delivery & Support</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}