import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export const Product = (props) =>{
    const [product, setProduct] = useState({});
    useEffect(() => {
        setProduct(props.product.data);
    }, [props]);

    const getClassName = () =>{
        return "mt-3 col-xs-12 " + props.colClass;
    }


    const onDeleteHandle = () =>{
        props.setModal({
            title: "Hey!",
            content: "Do you really wanna delete this item?",
            icon: faQuestion,
            buttons: [
                {
                    label: "Yeah",
                    color: "primary",
                    callback: () => {props.onDeleteHandle(props.product.id, product)}
                },
                {
                    label: "Nope",
                    color: "secondary",
                    callback: "close"
                }
            ]
        });
    }

    const renderPrice = () =>{
        if(product && product.price){
                if(product.price.toString().indexOf(".") < 0)
                    return product.price+".00";
                else{
                    let decimal = product.price.split(".")[1];
                    return (decimal.length < 2) ? product.price+"0" : product.price;
                }
                    
        }
        
        return null;
    }

    return (
        <div className={getClassName()}>
            <div className="p-1 bg-light rounded shadow">
                <div className="row px-4">
                    <div className="col-6 border-bottom py-2">
                        {product.category}
                    </div>
                    <div className="col-6 text-right border-bottom py-2">
                        <FontAwesomeIcon icon={faTrash} onClick={() => onDeleteHandle()} className="ml-3 cursor-pointer" />
                    </div>
                </div>
                <div className="row px-4 py-2">
                    <div className="col-12">
                        <b>{product.title}</b>
                        <div>
                            {product.description}
                        </div>
                        <div>
                            {renderPrice()}€
                        </div>
                        <div className="text-right">
                            Created by: {product.employee}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}