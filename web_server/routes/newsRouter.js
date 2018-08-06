import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.get("/news", (req, res, next) => {
  const news = [
    {
      url:
        "http://www.foxnews.com/science/2018/08/01/biggest-king-penguin-colony-sees-catastrophic-drop.html",
      title: "Biggest king penguin colony sees a catastrophic drop",
      description:
        "For now, researchers have no clear answer on what explains the population plunge, though followup field studies could shed light. “It is completely unexpected, and particularly significant since this colony represented nearly one third of the king penguins in the world,” says lead author Henri Weimerskirch of the Centre for Biological Studies in Chize, France.",
      source: "fox",
      urlToImage:
        "http://a57.foxnews.com/images.foxnews.com/content/fox-news/science/2018/08/01/biggest-king-penguin-colony-sees-catastrophic-drop/_jcr_content/par/featured-media/media-0.img.jpg/931/524/1533112090619.jpg?ve=1&tl=1",
      digest: "1",
      reason: "Recommend"
    },
    {
      url:
        "https://www.ccn.com/litecoin-price-massively-discounted-cryptocurrency-analyst/",
      title: "Litecoin Price ‘Massively Discounted’: Cryptocurrency Analyst",
      description:
        "upporters of litecoin often tout the sixth-largest cryptocurrency as “silver to bitcoin’s digital gold,” but one cryptocurrency says it’s also a diamond in the rough.",
      source: "cnn",
      urlToImage:
        "https://248qms3nhmvl15d4ne1i4pxl-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/Litecoin-bg-760x400.jpg",
      digest: "2",
      reason: "Recommend"
    },
    {
      url:
        "https://www.ccn.com/litecoin-price-massively-discounted-cryptocurrency-analyst/",
      title: "Litecoin Price ‘Massively Discounted’: Cryptocurrency Analyst",
      description:
        "upporters of litecoin often tout the sixth-largest cryptocurrency as “silver to bitcoin’s digital gold,” but one cryptocurrency says it’s also a diamond in the rough.",
      source: "cnn",
      urlToImage:
        "https://248qms3nhmvl15d4ne1i4pxl-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/Litecoin-bg-760x400.jpg",
      digest: "2",
      reason: "Recommend"
    }
  ];
  res.json(news);
});

export default router;
