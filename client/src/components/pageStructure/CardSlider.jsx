import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css/effect-cards";

function CardSlider({ pieces, title }) {
    return (
        <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="cardSlider"
        >
            {pieces.map(piece => (
                <SwiperSlide>
                    <img src={piece} alt={title} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CardSlider;