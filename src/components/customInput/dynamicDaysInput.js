import React, {useState} from 'react';
import axios from "axios";

const DynamicDaysInput = () => {
    const [tourImages, setTourImages] = useState([])
    const [tourDays, setTourDays] = useState([{...days}])
    const [tourHotels, setTourHotels] = useState([{...hotels}])
    const [importantInfo, setImportantInfo] = useState([{...importantInformation}])

    function addFieldDays() {
        const added = [...tourDays]
        const dynamicInput = {...days}
        added.push(dynamicInput)
        setTourDays(added)
        // setTourDays([...tourDays, days])
    }

    function handleChangeDayTitle(event, index) {
        const valueNew = [...tourDays]
        valueNew[index].daysTitle = event
        setTourDays(valueNew)
    }

    function handleChangeDayDesc(event, index) {
        const valueNew = [...tourDays]
        valueNew[index].daysDescription = event
        setTourDays(valueNew)
    }

    function handleChangeDayImages(event, index) {
        const valueNew = [...tourDays]
        valueNew[index].daysImages = event
        setTourDays(valueNew)
    }

    function addFieldHotel() {
        const addedHotel = [...tourHotels]
        const dynamicInputHotel = {...hotels}
        addedHotel.push(dynamicInputHotel)
        setTourHotels(addedHotel)
    }

    function handleChangeHotelTitle(event, index) {
        const newHotelValue = [...tourHotels]
        newHotelValue[index].hotelTitle = event
        setTourHotels(newHotelValue)
    }

    function handleChangeHotelDesc(event, index) {
        const newHotelValue = [...tourHotels]
        newHotelValue[index].hotelDescription = event
        setTourHotels(newHotelValue)
    }

    function handleChangeHotelImages(event, index) {
        const newHotelValue = [...tourHotels]
        newHotelValue[index].hotelImages = event
        setTourHotels(newHotelValue)
    }

    function addFieldImportantInfo() {
        const added = [...importantInfo]
        const dynamic = {...importantInformation}
        added.push(dynamic)
        setImportantInfo(added)
    }

    function importantInfoTitle(event, index) {
        const newHotelValue = [...importantInfo]
        newHotelValue[index].title_important_information = event
        setImportantInfo(newHotelValue)
    }

    function importantInfoDesc(event, index) {
        const newHotelValue = [...importantInfo]
        newHotelValue[index].description_important_information = event
        setImportantInfo(newHotelValue)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        let dat = Object.fromEntries(data.entries());
        const myFormData = new FormData();

        myFormData.append("title_tour", dat.tourTitle);
        myFormData.append("text_tour", dat.tourText);

        for (let i = 0; i < tourImages.length; i++) {
            myFormData.append(`tour_images[${i}]image`, tourImages[i])
        }

        for (let i = 0; i < tourDays.length; i++) {
            myFormData.append(`days[${i}]title_days`, tourDays[i]?.daysTitle);
            myFormData.append(`days[${i}]description_days`, tourDays[i]?.daysDescription);
            for (let j = 0; j < tourDays[i].daysImages.length; j++) {
                myFormData.append(`days[${i}]days_images[${j}]image`, tourDays[i].daysImages[j]);
            }
        }

        myFormData.append("accommodations[0]title_accommodation", dat.accommodationTitle)
        myFormData.append("accommodations[0]description_accommodation", dat.accommodationDescription)
        myFormData.append("accommodations[0]comfort", dat.comfort)
        myFormData.append("accommodations[0]type", dat.type)

        for (let i = 0; i < tourHotels.length; i++) {
            myFormData.append(`accommodations[0]hotels[${i}]title_hotel`, tourHotels[i]?.hotelTitle)
            myFormData.append(`accommodations[0]hotels[${i}]description_hotel`, tourHotels[i]?.hotelDescription)
            for (let j = 0; j < tourHotels[i].hotelImages.length; j++) {
                console.log(tourHotels[i].hotelImages.length, 'len')
                myFormData.append(`accommodations[0]hotels[${i}]hotel_images[${j}]image`, tourHotels[i]?.hotelImages[j]);
            }
        }

        for (let i = 0; i < importantInfo.length; i++) {
            myFormData.append(`important_informations[${i}]title_important_information`, importantInfo[i].title_important_information)
            myFormData.append(`important_informations[${i}]description_important_information`, importantInfo[i].description_important_information)
        }

        await axios({
            method: "post",
            url: "http://16.16.207.87/tour_create/" +
                "",
            data: myFormData,
            headers: {
                'Content-Type': `multipart/form-data; `
            }
        }).then(function (response) {
            //handle success
            console.log(response, 'res');
        }).catch(function (response) {
            //handle error
            console.log(response, 'err');
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
                                        onChange={(e) => handleChangeDayTitle(e.target.value, index)}
                                    />
                                    <input
                                        type="text"
                                        name={'daysDescription'}
                                        placeholder={'description days'}
                                        value={item.daysDescription}
                                        onChange={(e) => handleChangeDayDesc(e.target.value, index)}
                                    />
                                    <input
                                        accept={'image/*, .png, .jpg, .gif, .web,'}
                                        type='file'
                                        multiple={true}
                                        onChange={(e) => handleChangeDayImages(e.target.files, index)}
                                        placeholder={'day image'}
                                    />
                                </div>
                            ))
                        }
                        <button onClick={addFieldDays} type={'button'}>Добавить день</button>
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

                        <select name="comfort">
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
                            {
                                tourHotels.map((item, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name={'hotelTitle'}
                                            placeholder={'title_hotel'}
                                            value={item.hotelTitle}
                                            onChange={(e) => handleChangeHotelTitle(e.target.value, index)}
                                        />
                                        <input
                                            type="text"
                                            name={'hotelDescription'}
                                            placeholder={'description_hotel'}
                                            value={item.hotelDescription}
                                            onChange={(e) => handleChangeHotelDesc(e.target.value, index)}
                                        />
                                        <input
                                            type="file"
                                            accept={'image/*, .png, .jpg, .gif, .web,'}
                                            multiple={true}
                                            onChange={(e) => handleChangeHotelImages(e.target.files, index)}
                                            placeholder={'hotel images'}
                                        />
                                    </div>
                                ))
                            }
                            <button onClick={addFieldHotel} type={'button'}>Добавить проживание</button>
                        </div>
                        <div>
                            <h1>important information</h1>
                            {
                                importantInfo.map((item, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            placeholder={'title important information'}
                                            name={'title_important_information'}
                                            value={item.title_important_information}
                                            onChange={(e) => importantInfoTitle(e.target.value, index)}
                                        />
                                        <input
                                            type="text"
                                            placeholder={'description important information'}
                                            name={'description_important_information'}
                                            value={item.description_important_information}
                                            onChange={(e) => importantInfoDesc(e.target.value, index)}
                                        />
                                    </div>
                                ))
                            }
                            <button type={'button'} onClick={addFieldImportantInfo}>добавть инфо</button>
                        </div>
                    </div>
                    <button type={'submit'}>Создать тур</button>
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

export const hotels = {
    hotelTitle: '',
    hotelDescription: '',
    hotelImages: []
};

export const importantInformation = {
    title_important_information: '',
    description_important_information: ''
}

