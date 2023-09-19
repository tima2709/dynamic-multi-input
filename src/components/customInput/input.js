import React, {useEffect, useState} from 'react';
import axios from "axios";


const Input = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [titleInfo, setTitleInfo] = useState('')
    const [descriptionInfo, setDescriptionInfo] = useState('')
    const [imageInfo, setImageInfo] = useState(null)


    useEffect(() => {
        axios.get('http://13.51.69.115/comments/')
            .then(({data}) => {
                console.log(data, '22')
            })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        let dat = Object.fromEntries(data.entries());
        console.log(dat);

        const myFormData = new FormData();

        myFormData.append("title_comment", dat.title_comment);
        myFormData.append("description_comment", dat.description_comment);
        myFormData.append("image_comment", dat.image_comment);
        // ----- news -----
        myFormData.append("news.title", dat.title);
        myFormData.append("news.description", dat.description);
        myFormData.append("news.image", dat.image);


        axios({
            method: "post",
            url: "http://13.51.69.115/comments/",
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
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <input value={titleInfo} name={'title'} onChange={(e) => setTitleInfo(e.target.value)}/>
                <input value={descriptionInfo} name={'description'}
                       onChange={(e) => setDescriptionInfo(e.target.value)}/>
                <input
                    type='file'
                    name={'image'}
                    multiple={true}
                    accept={'image/*, .png, .jpg, .gif, .web,'}
                    onChange={(e) => setImageInfo(e.target.files[0])}
                />
                <button type={'submit'}>add</button>
            </form>

        </div>
    );
};

export default Input;