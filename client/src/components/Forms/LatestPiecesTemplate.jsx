import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

function LatestPiecesTemplate({ payloads, Card, categoryName, load, link }) {
    return (
        <div className="latest">
            <div className="latestPiecesHeader">
                <h4>Latest {categoryName} Pieces</h4>
            </div>
            <div className="latestPieces">
                {
                    payloads != null ?
                        payloads.length > 0 ?
                            <Swiper
                                effect={"coverflow"}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={"auto"}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                pagination={true}
                                modules={[EffectCoverflow, Pagination]}
                                className="overflowSlider"
                            >
                                {payloads.map((payload, i) => (
                                    <SwiperSlide className="latestSlide" key={payload._id}>
                                        <Card payload={payload} key={payload._id} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            : <div className="card">Whole lot of nothing</div>
                        : <div></div>
                }

            </div>
        </div>
    )
}

export default LatestPiecesTemplate