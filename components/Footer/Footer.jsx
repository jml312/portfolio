import J from "components/svgs/J";
import { FiCoffee } from "react-icons/fi";
import getStripe from "lib/stripe";
import Link from "next/link";

function Footer({
  footerRef,
  links,
  isStripeLoading,
  setIsStripeLoading,
  useTransition,
  marginTop
}) {
  const handleStripe = async () => {
    setIsStripeLoading(true);
    const stripe = await getStripe();
    const res = await fetch("/api/stripe-payment", {
      method: "POST"
    });
    const checkoutSession = await res.json();
    await stripe.redirectToCheckout({
      sessionId: checkoutSession?.id
    });
    setIsStripeLoading(false);
  };

  return (
    <footer
      ref={footerRef}
      className={`z-50 flex flex-col justify-center items-center gap-8 w-screen py-10 bg-dark dark:bg-light text-light dark:text-dark text-center mb-0 ${marginTop}`}
    >
      <J />
      <div className="flex flex-wrap items-center justify-center gap-5">
        {links.map(({ name, href, Icon, isExternal }) =>
          isExternal ? (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={name}
              className={`hover:text-[rgba(255,255,245,0.8)] dark:hover:text-[rgba(28,29,37,0.8)] active:scale-95 ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
            >
              <Icon className="text-2xl" />
            </a>
          ) : (
            <Link key={name} href={href}>
              <a
                key={name}
                title={name}
                className={`hover:text-[rgba(255,255,245,0.8)] dark:hover:text-[rgba(28,29,37,0.8)] active:scale-95 ${
                  useTransition
                    ? "transition-all duration-[250ms] ease-in-out"
                    : "transition-none"
                }`}
              >
                <Icon className="text-2xl" />
              </a>
            </Link>
          )
        )}
      </div>
      <button
        disabled={isStripeLoading}
        onClick={handleStripe}
        className={`text-dark dark:text-light flex justify-center items-center gap-[.4375rem] bg-light dark:bg-dark rounded-md text-sm px-4 py-3 hover:bg-[rgba(255,255,245,0.8)] dark:hover:bg-[rgba(28,29,37,0.8)] ${
          useTransition
            ? "transition-all duration-[250ms] ease-in-out active:scale-95"
            : "transition-none"
        }`}
      >
        Buy me a <FiCoffee />
      </button>
      <p
        className={
          "text-[rgba(255,255,245,0.9)] dark:text-[rgba(28,29,37,0.9)] text-sm"
        }
      >
        &copy; {new Date().getFullYear()} Josh Levy. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
