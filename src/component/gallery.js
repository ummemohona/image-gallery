// Gallery.js
import {useRef, useState, React} from "react";
import "../styles/gallery.css";
import {Row, Col, Upload, message, Checkbox} from "antd";
import {FileImageOutlined} from "@ant-design/icons";
import TopBar from "./topbar";

const {Dragger} = Upload;

const Gallery = () => {
    const [images, setImages] = useState([
        {id: 1, title: "Image 1", src: "/images/image-1.webp"},
        {id: 2, title: "Image 2", src: "/images/image-2.webp"},
        {id: 3, title: "Image 3", src: "/images/image-3.webp"},
        {id: 4, title: "Image 4", src: "/images/image-4.webp"},
        {id: 5, title: "Image 5", src: "/images/image-5.webp"},
        {id: 6, title: "Image 6", src: "/images/image-6.webp"},
        {id: 7, title: "Image 7", src: "/images/image-7.webp"},
        {id: 8, title: "Image 8", src: "/images/image-8.webp"},
        {id: 9, title: "Image 9", src: "/images/image-9.webp"},
        {id: 10, title: "Image 10", src: "/images/image-10.jpeg"},
        {id: 11, title: "Image 11", src: "/images/image-11.jpeg"},
    ]);

    const [selectedImageIds, setSelectedImageIds] = useState([]);
    const handleImageSelect = (index) => {
        const updatedImages = [...images];
        updatedImages[index].selected = !updatedImages[index].selected;
        setImages(updatedImages);
    };

    const handleImageDelete = () => {
        const updatedImages = images.filter((image) => !image.selected);
        setImages(updatedImages);
        setSelectedImageIds([]);
    };

    const selectedImages = images.filter((image) => image.selected);
    const selectedImageCount = selectedImages.length;

    const dragImg = useRef(0);
    const dragOverImg = useRef(0);
    const handleSort = () => {
        const imageClone = [...images];
        const temp = imageClone[dragImg.current]
        imageClone[dragImg.current] = imageClone[dragOverImg.current];
        imageClone[dragOverImg.current] = temp;
        setImages(imageClone);
    }

    const handleUpload = (info) => {
        console.log(info);
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
            const relativeImagePath = `/tmp/File-upload/${info.file.name}`;
            const uploadedImage = {
                id: images.length + 1,
                title: info.file.name,
                src: relativeImagePath,
            };
            setImages([...images, uploadedImage]);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed`);
        }
    };

    return (
        <div className="gallery">
            <TopBar
                selectedImageCount={selectedImageCount}
                onDeleteSelected={handleImageDelete}
                show={selectedImageCount > 0}
            />
            <Row gutter={16}>
                {images.map((image, index) => (
                    <Col span={6} key={image.id} className="gutter-row ">
                        <div className="image-container image-cell"
                             style={{margin: '0.5rem'}}
                             draggable
                             onDragStart={() => (dragImg.current = index)}
                             onDragEnter={() => (dragOverImg.current = index)}
                             onDragEnd={handleSort}
                             onDragOver={(e) => e.preventDefault()}
                        >
                            <Checkbox
                                className="image-checkbox"
                                checked={image.selected}
                                onChange={() => handleImageSelect(index)}
                            />
                            <img src={image.src} alt={image.title} className="small-image bordered"/>
                        </div>
                    </Col>
                ))}
                <Col span={6}>
                    <div className="image-container small-image">
                        <Dragger
                            multiple={true}
                            showUploadList={true}
                            customRequest={() => {
                            }}
                            onChange={handleUpload}
                            style={{margin: '0.5rem'}}
                        >
                            <p className="ant-upload-drag-icon">
                                <FileImageOutlined/>
                            </p>
                            <p className="ant-upload-text">Add Image</p>
                        </Dragger>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Gallery;
