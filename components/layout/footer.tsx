import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-medium tracking-tight mb-6">NORDLYS TECH</div>
            <p className="text-neutral-600 max-w-md">
              Precision-engineered AI solutions for the chemical and process engineering industry. We transform complex
              engineering challenges into streamlined, intelligent solutions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-6">Navigation</h3>
            <ul className="space-y-4">
              {["About", "Solutions", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-6">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-neutral-600 mb-4">
                Sollerudveien
                <br />
                Lysaker, 0283 Norway
              </p>
              <p className="text-sm text-neutral-600">contact@nordlystech.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-neutral-100 mt-16 pt-8 text-center text-sm text-neutral-600">
          <p>&copy; {new Date().getFullYear()} Nordlys Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

