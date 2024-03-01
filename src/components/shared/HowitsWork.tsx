import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import SetupImage from "../../assets/Icon.png";
import CreateImage from "../../assets/Create.png";
import StartImage from "../../assets/Start.png";
import EarningImage from "../../assets/Errning.png";

export function HowitsWork() {
  const cards = [
    {
      title: "Setup Your Wallet",
      description:
        "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
      buttonText: "Try now →",
      buttonColor: "text-xs font-normal dark:text-white",
      imageSrc: SetupImage,
      alt: "Setup Your Wallet Image",
      link: "/setup-wallet"
    },
    {
      title: "Create Collection",
      description:
        "Upload your work and setup your collection. Add a description, social links, and floor price.",
      buttonText: "Try now →",
      buttonColor: "text-xs font-normal dark:text-white",
      imageSrc: CreateImage,
      alt: "Create Collection Image",
      link: "/create-collection"
    },
    {
      title: "Start Earning",
      description:
        "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
      buttonText: "Try now →",
      buttonColor: "text-xs font-normal dark:text-white",
      imageSrc: StartImage,
      alt: "Start Earning Image",
      link: "/start-earning"
    },
    {
      title: "Start Earning",
      description:
        "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
      buttonText: "Try now →",
      buttonColor: "text-xs font-normal dark:text-white",
      imageSrc: EarningImage,
      alt: "Start Earning Image",
      link: "/start-earning"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      {cards.map((card, index) => (
        <CardContainer key={index} className="inter-var max-w-xs">
          <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-[#05121B] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xs font-bold text-white"
            >
              {card.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-sm max-w-sm mt-2 text-neutral-300"
            >
              {card.description}
            </CardItem>
            <CardItem
              translateZ="100"
              className="w-full mt-4 flex justify-center items-center"
            >
              <img
                src={card.imageSrc}
                height="1000"
                width="1000"
                loading="lazy"
                className="h-40 w-40 object-cover rounded-xl group-hover/card:shadow-xl"
                alt={card.alt}
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <Link to={card.link} className={`px-4 py-2 rounded-xl ${card.buttonColor}`}>
                {card.buttonText}
              </Link>
              <button className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold">
                <Link to="/sign-up">Sign up</Link>
              </button>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
