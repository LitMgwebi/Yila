import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
                                modules={[Navigation, A11y, Pagination, Scrollbar]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {payloads.map((payload, i) => (
                                    <SwiperSlide className="latestSlide">
                                        <Card payload={payload} key={i} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            : <div className="seeMore">Whole lot of nothing</div>
                        : <div></div>
                }

            </div>
        </div>
    )
}

export default LatestPiecesTemplate