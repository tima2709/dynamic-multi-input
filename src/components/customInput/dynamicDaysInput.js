import React, {useState} from 'react';
import axios from "axios";

const DynamicDaysInput = () => {
    const [tourImages, setTourImages] = useState([])
    // const [daysImages, setDaysImages] = useState([])
    const [hotelImages, setHotelImages] = useState([])
    const [tourDays, setTourDays] = useState([{...days}])

    // console.log(tourDays, 'tourDays')


    function addFieldDays() {
        if (tourDays.length) {
            const added = [...tourDays]
            const dynamicInput = {...days}
            added.push(dynamicInput)
            setTourDays(added)
        }
    }

    function handleChangeTitle(event, index) {
        const valueNew = [...tourDays]
        valueNew[index].daysTitle = event
        setTourDays(valueNew)
    }

    function handleChangeDesc(event, index) {
        const valueNew = [...tourDays]
        valueNew[index].daysDescription = event
        setTourDays(valueNew)
    }

    function handleChangeImages(event, index) {
        const valueNew = [...tourDays]
        valueNew[index].daysImages = event
        setTourDays(valueNew)
    }




    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        // console.log(data, 'data')
        let dat = Object.fromEntries(data.entries());
        // console.log(dat, 'dat')
        const myFormData = new FormData();

        myFormData.append("title_tour", dat.tourTitle);
        myFormData.append("text_tour", dat.tourText);

        for (let i = 0; i < tourImages.length; i++) {
            myFormData.append(`tour_images[${i}]image`, tourImages[i])
        }

        // myFormData.append("days[0]title_days", dat.daysTitle)
        // myFormData.append("days[0]description_days", dat.daysDescription)
        //
        // for (let i = 0; i < daysImages.length; i++) {
        //     myFormData.append(`days[0]days_images[${i}]image`, daysImages[i])
        // }

        for (let i = 0; i < tourDays.length; i++) {
            myFormData.append(`days[${i}]title_days`, tourDays[i]?.daysTitle);
            myFormData.append(`days[${i}]description_days`, tourDays[i]?.daysDescription);
            console.log(tourDays[i].daysImages.length, 'len')
            for (let j = 0; j < tourDays[i].daysImages.length; j++) {
                myFormData.append(`days[${i}]days_images[${j}]image`, tourDays[i].daysImages[j]);
            }
        }


        myFormData.append("accommodations[0]title_accommodation", dat.accommodationTitle)
        myFormData.append("accommodations[0]description_accommodation", dat.accommodationDescription)
        myFormData.append("accommodations[0]comfort", dat.comfort)
        myFormData.append("accommodations[0]type", dat.type)
        myFormData.append("accommodations[0]hotels[0]title_hotel", dat.hotelTitle)
        myFormData.append("accommodations[0]hotels[0]description_hotel", dat.hotelDescription)


        for (let i = 0; i < hotelImages.length; i++) {
            myFormData.append(`accommodations[0]hotels[0]hotel_images[${i}]image`, hotelImages[i])
        }

        await axios({
            method: "post",
            url: "http://16.16.201.16/tour_create/",
            data: myFormData,
            headers: {
                'Content-Type': `multipart/form-data; `
            }
        }).then(function (response) {
            //handle success
            console.log(response);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder={'tour'}
                        name={"tourTitle"}
                    />
                    <input
                        type='text'
                        placeholder={'text_tour'}
                        name={'tourText'}

                    />
                    <input
                        accept={'image/*, .png, .jpg, .gif, .web,'}
                        type='file'
                        multiple={true}
                        onChange={(e) => setTourImages(e.target.files)}
                        placeholder={'tour images'}
                    />
                    <div>
                        <h1>Days</h1>
                        {
                            tourDays.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name={'daysTitle'}
                                        placeholder={'title days'}
                                        value={item.daysTitle}
                                        onChange={(e) => handleChangeTitle(e.target.value, index)}
                                    />
                                    <input
                                        type="text"
                                        name={'daysDescription'}
                                        placeholder={'description days'}
                                        value={item.daysDescription}
                                        onChange={(e) => handleChangeDesc(e.target.value, index)}
                                    />
                                    <input
                                        accept={'image/*, .png, .jpg, .gif, .web,'}
                                        type='file'
                                        multiple={true}
                                        onChange={(e) => handleChangeImages(e.target.files, index)}
                                        placeholder={'day image'}
                                    />
                                </div>
                            ))
                        }
                        <button onClick={addFieldDays}>dobavit den</button>
                    </div>
                    <div>
                        <h1>accommodations</h1>
                        <input
                            type="text"
                            name={'accommodationTitle'}
                            placeholder={'title_accommodation'}

                        />
                        <input
                            type="text"
                            name={'accommodationDescription'}
                            placeholder={'description_accommodation'}

                        />

                        <select name="comfort" >
                            <option value="Base">Base</option>
                            <option value="Simple">Simple</option>
                            <option value="Medium">Medium</option>
                            <option value="luxury">Luxury</option>
                            <option value="Premium">Premium</option>
                        </select>
                        <select name="type" id="">
                            <option value="Tent">Tent</option>
                            <option value="Hostel">Hostel</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Cottage">Cottage</option>
                        </select>
                        <div>
                            <h1>hotel</h1>
                            <input
                                type="text"
                                name={'hotelTitle'}
                                placeholder={'title_hotel'}

                            />
                            <input
                                type="text"
                                name={'hotelDescription'}
                                placeholder={'description_hotel'}

                            />
                            <input
                                type="file"
                                accept={'image/*, .png, .jpg, .gif, .web,'}
                                multiple={true}
                                onChange={(e) => setHotelImages(e.target.files)}
                                placeholder={'hotel images'}
                            />
                        </div>
                    </div>

                    <button
                        type={'submit'}
                        // onClick={handleSubmit}
                    >
                        add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DynamicDaysInput;

export const days = {
    daysTitle: '',
    daysDescription: '',
    daysImages: []
};