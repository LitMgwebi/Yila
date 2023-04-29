import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper";

function FlipSlider({ pieces, title }) {
    const artworks = Array.from(pieces);
    return (
        <Swiper
            effect={"flip"}
            grabCursor={true}
            pagination={true}
            navigation={true}
            modules={[EffectFlip, Pagination, Navigation]}
            className="flipSlider"
        >
            {artworks.map(artwork => (
                <SwiperSlide className="swiperSlide">
                    <img src={artwork} alt={title} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default FlipSlider;