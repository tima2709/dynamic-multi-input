import React, {useEffect, useState} from 'react';
import axios from "axios";

const MultipleImage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)


    useEffect(() => {
        axios.get('http://13.51.233.39/days/')
            .then(({data}) => {
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        let dat = Object.fromEntries(data.entries());

        const myFormData = new FormData();

        myFormData.append("title", dat.title_comment);
        myFormData.append("description", dat.description_comment);

        const arr = new Array(image)


        arr.forEach((item) => {
                myFormData.append('day_image_carousel', item[0]);

            });
        // myFormData.append("day_image_carousel.image", dat.image_comment);


        axios({
            method: "post",
            url: "http://13.51.233.39/days/",
            data: myFormData,
            headers: {
                'Content-Type': `multipart/form-data;`
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
            <form onSubmit={handleSubmit} id={'formElem'}>
                <input value={title} name={'title_comment'} onChange={(e) => setTitle(e.target.value)}/>
                <input value={description} name={'description_comment'}
                       onChange={(e) => setDescription(e.target.value)}/>
                <input
                    accept={'image/*, .png, .jpg, .gif, .web,'}
                    type='file'
                    multiple={true}
                    name={'image_comment'}
                    // formEncType={'multipart/form-data'}
                    onChange={(e) => setImage(e.target.files)}
                />

                <button type={'submit'}>add</button>
            </form>
            <div>

            </div>
        </div>
    );
};

export default MultipleImage;