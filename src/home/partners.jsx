import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faApple,
    faFacebook,
    faGithub,
    faGoogle,
    faTwitter
  } from "@fortawesome/free-brands-svg-icons";

const PartnersLogos = () => {
  const icons = [faApple, faFacebook, faGithub, faGoogle, faTwitter];

  return (
    <section className="w-full px-0 md:px-6 lg:px-8 pt-16">
        <div className="text-center">
            <h1 className="text-2xl tracking-tight text-balance sm:text-4xl font-semibold text-gray-900 dark:text-white hover:bg-gray-50">
                We Partner With
            </h1>
        </div>

        <div className="mx-5 relative flex overflow-x-hidden">
            <div className="whitespace-nowrap flex animate-marquee">
            {Array(4).fill(icons).flat().map((icon, idx) => (
                <div
                    key={idx}
                    className="mx-8 inline-block py-12 align-middle"
                >
                    <FontAwesomeIcon
                    icon={icon}
                    className="hover:filter-none transition-all duration-300 cursor-pointer text-gray-500 hover:text-gray-700"
                    size="3x"
                    />
                </div>
            ))}
            </div>

            <div className="absolute top-0 animate-marquee-right whitespace-nowrap">
            {Array(4).fill(icons).flat().map((icon, idx) => (
                <div
                    key={idx}
                    className="mx-8 inline-block py-12 align-middle"
                >
                    <FontAwesomeIcon
                    icon={icon}
                    className="hover:filter-none transition-all duration-300 cursor-pointer text-gray-500 hover:text-gray-700"
                    size="3x"
                    />
                </div>
            ))}
            </div>
        </div>
    </section>
  );
};

export default PartnersLogos;