import React, {useState} from 'react';
import axios from "axios";

const AccommodationsTourList = () => {
    const [title1, setTitle1] = useState('')
    const [description, setDescription] = useState('')
    const [tourImages, setTourImages] = useState([])
    const [image, setImage] = useState([])
    const [hotel_images, setHotel_images] = useState([])



    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        let dat = Object.fromEntries(data.entries());
        console.log(dat, 'dat')
        const myFormData = new FormData();

        myFormData.append("title_tour", dat.title_tour);
        myFormData.append("text_tour", dat.text_tour);

        for (let i = 0; i < tourImages.length; i++) {
            // console.log(image[i], 'arr')
            myFormData.append(`tour_images[${i}]image`, tourImages[i])
        }

        myFormData.append("days[0]title_days",  dat.title_days)
        myFormData.append("days[0]description_days", dat.description_days)

        // for (let i = 0; i < dat.days.length; i++) {
        //     myFormData.append(`days[${i}]title_days`, dat.days[i]?.title_days);
        //     myFormData.append(`days[${i}]description_days`, dat.days[i]?.description_days);
        // }

        myFormData.append("accommodations[0]title_accommodation", dat.title_accommodation)
        myFormData.append("accommodations[0]description_accommodation", dat.description_accommodation)
        myFormData.append("accommodations[0]comfort", dat.comfort)
        myFormData.append("accommodations[0]type", dat.type)
        myFormData.append("accommodations[0]hotels[0]title_hotel", dat.title_hotel)
        myFormData.append("accommodations[0]hotels[0]description_hotel", dat.description_hotel)


        for (let i = 0; i < image.length; i++) {
            // console.log(image[i], 'arr')
            myFormData.append(`days[0]days_images[${i}]image`, image[i])
        }

        for (let i = 0; i < hotel_images.length; i++) {
            // console.log(hotel_images[i], 'arr')
            myFormData.append(`accommodations[0]hotels[0]hotel_images[${i}]image`, hotel_images[i])
        }

        axios({
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
                <form onSubmit={handleSubmit} id={'formElem'}>
                    <input value={title1} name={'title_tour'} placeholder={'tour'} onChange={(e) => setTitle1(e.target.value)}/>
                    <input value={description} name={'text_tour'}
                           onChange={(e) => setDescription(e.target.value)}
                           placeholder={'text tour'}
                    />
                    <input
                        accept={'image/*, .png, .jpg, .gif, .web,'}
                        type='file'
                        multiple={true}
                        name={'image_comment'}
                        // formEncType={'multipart/form-data'}
                        onChange={(e) => setTourImages(e.target.files)}
                        placeholder={'tour images'}
                    />

                    <input
                        type="text" name={'title_days'}
                        placeholder={'title days'}
                    />
                    <input
                        type="text" name={'description_days'}
                        placeholder={'description days'}
                    />
                    <input
                        accept={'image/*, .png, .jpg, .gif, .web,'}
                        type='file'
                        multiple={true}
                        name={'image_comment'}
                        // formEncType={'multipart/form-data'}
                        onChange={(e) => setImage(e.target.files)}
                        placeholder={'day image'}
                    />
                    <div>
                        <h1>accommodations</h1>
                        <input type="text" name={'title_accommodation'} placeholder={'title_accommodation'}/>
                        <input type="text" name={'description_accommodation'} placeholder={'description_accommodation'}/>
                        <input type="text" name={'comfort'} placeholder={'comfort'}/>
                        <input type="text" name={'type'} placeholder={'type'}/>
                        <input type="text" name={'title_hotel'} placeholder={'title_hotel'}/>
                        <input type="text" name={'description_hotel'} placeholder={'description_hotel'}/>
                        <input
                            type="file"
                            name={'hotel_images'}
                            accept={'image/*, .png, .jpg, .gif, .web,'}
                            multiple={true}
                            onChange={(e) => setHotel_images(e.target.files)}
                            placeholder={'hotel images'}
                        />
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

export default AccommodationsTourList;