import React, {useState} from 'react';
import axios from "axios";

const TourList = () => {
    const [title1, setTitle1] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([])

    // const imgFormData = new FormData()
    //
    // const arr = new Array(image)
    //
    //
    // arr.forEach((item) => {
    //     imgFormData.append('days_images', item[0]);
    //     });
    //




    const data1 =  {
        title_tour: "Это тайтл qwe1",
        text_tour: "это текст qwe1",
        days: [
            {
                title_days: "Это тайтл21asd qweqwe1",
                description_days: "это asd qew1",
                days_images: [
                    // imgFormData
                ]
            }
        ]
    }



    // useEffect(() => {
    //     axios.get('http://16.171.14.24/tours/')
    //         .then(({data}) => {
    //             console.log(data, 'data')
    //         })
    // }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        let dat = Object.fromEntries(data.entries());
        console.log(dat, 'dat')
        const myFormData = new FormData();

        myFormData.append("title_tour", dat.title_tour);
        myFormData.append("text_tour", dat.text_tour);
        myFormData.append("days[0]title_days",  dat.title_days)
        myFormData.append("days[0][description_days]", dat.description_days)
        // myFormData.append('days[0]days_images[0]image', dat.image_comment);

        //
        // const arr = new Array(image)
        // console.log(arr?.FileList.length, 'len')

        for (let i = 0; i < image.length; i++) {
            console.log(image[i], 'arr')
            myFormData.append(`days[0]days_images[${i}]image`, image[i])
        }

        // arr.map((el, idx) => myFormData.append(`days[0]days_images[${idx}]image`, el[0]))

        // arr.forEach((item, idx) => {
        //     console.log( idx, 'idx')
        //     myFormData.append(`days[0]days_images[${idx}]image`, item[0]);
        //
        // });



        axios({
            method: "post",
            url: "http://16.171.14.24/tour_create/",
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
                    <input value={title1} name={'title_tour'} onChange={(e) => setTitle1(e.target.value)}/>
                    <input value={description} name={'text_tour'}
                           onChange={(e) => setDescription(e.target.value)}/>
                    <input type="text" name={'title_days'}/>
                    <input type="text" name={'description_days'}/>
                    <input
                        accept={'image/*, .png, .jpg, .gif, .web,'}
                        type='file'
                        multiple={true}
                        name={'image_comment'}
                        // formEncType={'multipart/form-data'}
                        onChange={(e) => setImage(e.target.files)}
                    />

                    <button
                        type={'submit'}
                        // onClick={handleSubmit}
                    >
                        add
                    </button>
                </form>
                <div>

                </div>
            </div>
        </div>
    );
};

export default TourList;