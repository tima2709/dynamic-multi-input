import React from 'react';
import './card.css'

const Cards = () => {
    return (
        <div className={'card-item'}>
            <div className={'card-img'}>
                <img src="https://cf.youtravel.me/tr:w-552,h-512/upload/tours/26100/media/ee3/ee32cdc36e9f5cd18b9bad0e1d7214e3.jpg" alt=""/>
            </div>
           <div className={'card-info'}>
               <div className={'card-wrapper'}>
                   <div className={'card-tour'}>
                       <div className={'star-icon'}><span>⭐</span></div>
                       <div className={'tour-rating-rating'}>5.0</div>
                       <div className={'tour-rating-number'}>(14)</div>
                       <div className={'tour-location'}>• Узбекистан, Центральная Азия</div>
                   </div>
                   <div className={'tour-body-title'}>
                       <span className={'tour-title'}>Кыргызстан - горы Тянь-Шань</span>
                   </div>
                   <div className={'tour-body-description'}>
                       <span className={'tour-description'}>Мы покажем не только города, но и природу Узбекистана!</span>
                   </div>
                   <div className={'tour-body-price'}>
                       <span className={'tour-price-original'}>77 348</span>
                       <span className={'tour-price-days'}> / 10 дней</span>
                   </div>
                   <div className={'tour-body-dates'}>
                       <div className={'tour-body-date'}>
                           28 сент. - 7 окт.
                       </div>
                   </div>
               </div>
           </div>
        </div>
    );
};

export default Cards;