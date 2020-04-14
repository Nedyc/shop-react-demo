import React, {useState, useEffect} from 'react';
import shop from "../../classes/shop";
import {Product} from "./product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import user from "../../classes/user";

export const ProductPage = (props) =>{
    const [firstCall, setFirstCall] = useState(null);
    const [products, setProducts] = useState([]);
    const [initProducts, setInitProducts] = useState([]);
    const [search, setSearch] = useState([]);
    const [count, setCount] = useState(0);
    const [colClass, setColClass] = useState("col-12");
    let formModel = {title: "", description: "", price: "", category:""};
    const [formObj, setFormObj] = useState(formModel);

    const categories = [
        {
            label: "Birthday",
            prop: "birthday",
        },
        {
            label: "Clothes",
            prop: "clothes",
        },
        {
            label: "Hats",
            prop: "hats",
        },
        {
            label: "Houseware",
            prop: "houseware",
        },
        {
            label: "Music",
            prop: "music",
        },
        {
            label: "T-shirts",
            prop: "t-shirts",
        },
        {
            label: "Toys",
            prop: "toys",
        },
        {
            label: "Trousers",
            prop: "trousers",
        },
        {
            label: "Wands",
            prop: "wands",
        },
    ];
    const demoData = [{"id":"67Gjv5cJfFq0T5jSjeCB","data":{"description":"high quality magic wand","employee":"Albus Dumbledore","category":"wands","id":0,"price":"2900","title":"elder wand"}},{"id":"B3rzjMH5wf1XW6jaQLYQ","data":{"description":"album","employee":"The Beatles","category":"music","price":"34","title":"revolver"}},{"id":"HPvfOxmiTS0FPdNBY7FA","data":{"description":"black pork pie hat","employee":"Elwood Blues","category":"hats","price":"96","title":"Blues Man"}},{"id":"ImOdMEka0XJgha0fdSGG","data":{"description":"t-shirt no sleeves","employee":"Norman","category":"t-shirts","price":"12","title":"Muscle"}},{"id":"W6yEBFB740tmaIDZjRqF","data":{"category":"trousers","price":"564","title":"the wrong trousers","description":"high tech trousers","employee":"Wallace"}},{"id":"avwQWqA60IUKh3qu2XUe","data":{"category":"clothes","reviews":"Very good shirt with nice colors","price":"1234","title":"Shirt-Handmade","description":"Unique handmade","employee":"Lorem"}},{"id":"d9WB9Wtg7YIkcrvmFW7S","data":{"description":"Hand made Batik shirt","employee":"Lorem","category":"clothes","price":22,"title":"Batik Shirt"}},{"id":"dCkcfmfQrL7zdveHwqzj","data":{"employee":"Ruhada","category":"clothes","reviews":"Not a good quality shirt","price":"123","title":"Shirt-Handmade","description":"handmade product"}},{"id":"hYnvxvEcqOYlLhQhroIT","data":{"title":"wiggle","description":"silly toy","employee":"Baby","category":"toys","price":"12"}},{"id":"ie7uQFtPB7t2RlJ5qLQT","data":{"title":"zz top","description":"casual 80's colourful jacket","employee":"Crocket","category":"jacket","price":"72"}},{"id":"jvpkU5BfenIRYDkPZpef","data":{"employee":"George Harrison","category":"music","price":"65","title":"Wings","description":"album"}},{"id":"lLdZJfNuXbtvwAHjarN6","data":{"title":"Birthday Cake","description":"Choco cake","employee":"Lorem","category":"birthday","reviews":"very delicious cake with chocolate and strawberries","price":"12.3"}},{"id":"mNWtiAX6HM0DCMoN9Hg1","data":{"employee":"Lorem","category":"clothes","price":22,"title":"Batik Shirt","description":"Hand made batik shirt"}},{"id":"qtqHRGhywA3ukRGoDeMv","data":{"description":"big decorative fish","employee":"Billy Bass","category":"houseware","price":"34","title":"Marlon"}},{"id":"rQCJ4dWKdJjZIXwuuXII","data":{"title":"a","description":"c","employee":"d","category":"a","price":"1"}},{"id":"sQ8jWi6s2IdreeaGkE3z","data":{"employee":"Flash Gordon","category":"houseware","price":"344","title":"Zapper","description":"ray gun"}},{"id":"tXddiQyK0eeruROXolAk","data":{"category":"bath","price":"20","title":"Blue Ruin","description":"blue towel","employee":"Roger Dodger"}}];

    useEffect(()=>{
        if(!firstCall){
            setFirstCall(true);
            fetchData();
        }
    });

    const fetchData = () =>{
        //Get stats from server
        props.api_call("stores/"+shop.getId()+"/products", "get").then((res)=>{
            if(res === null){
                //Load demo data if api call failed
                res = demoData;

                //Show alert
                props.setAlert({
                    text: "Demo data loaded...", 
                    type: "danger"
                });
            }
            
            setProducts(res);
            setInitProducts(res);
            setCount(res.length);
        });
    }

    //Filter products by search input
    const onSearch = (val) =>{
        setSearch(val);

        let filteredRes = [...initProducts];
        filteredRes = filteredRes.filter(res => {
            return setFilter(res.data.title, val) || setFilter(res.data.category, val) || setFilter(res.data.description, val)
        });
        setProducts(filteredRes);
        setCount(filteredRes.length);
    }

    const setFilter = (filter, val) => {
        return filter && filter.toLowerCase().includes(val.toLowerCase());
    }

    //Get product count
    const getProductCount = () =>{
        if(count === 0)
            return "No product found";

        return count+" products found";
    }



    //On delete handle
    const onDeleteHandle = (id, product) =>{
        //If is a product from the test data
        props.api_call("stores/"+shop.getId()+"/products/"+id, "delete").then((res)=>{
            if(res !== null)
                deleteElement(id);
        });
    }

    const deleteElement = (id) =>{
        fetchData();

        props.setAlert({
            text: "Item deleted succesfully...", 
            type: "success"
        });
    }


    //On form field change
    const onFormFieldChange = (field, val) => {
        const obj = {...formObj}
        obj[field] = val;
        setFormObj(obj);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        //Update products
        formObj.employee = user.getUsername();
        const obj = {data:formObj};
        delete obj.data.isVisible;
        //Call the post api
        props.api_call("stores/"+shop.getId()+"/products", "post", formObj).then((res)=>{
            props.setAlert({
                text: "Item added succesfully!", 
                type: "success"
            });
            obj.id = res;

            fetchData();
            onFormClose();
        });
    }


    //On add item button click
    const addItemHandle = () =>{
        const obj = {...formObj};
        obj.isVisible = true;
        setFormObj(obj);
        document.getElementById("title").focus();
    }

    const onFormClose = () => {
        setFormObj(formModel);
    }

    //Render the item create/edit form
    const renderForm = () =>{
        let classes = "mb-5 border-bottom pb-3 overflow-hidden";
        if(!formObj.isVisible)
            classes+="  not-vis";

        return (
            <form className={classes} onSubmit={(e)=>{onFormSubmit(e)}} id="itemForm">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        value={formObj.title} 
                        required 
                        className="form-control" 
                        id="title" 
                        onChange={(e)=>{onFormFieldChange("title", e.target.value)}} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                        required 
                        value={formObj.category} 
                        className="form-control" 
                        id="category" 
                        onChange={(e)=>{onFormFieldChange("category", e.target.value)}}
                    >
                        <option></option>
                    {
                        categories.map(function(category, i){
                            return <option key={i} value={category.prop}>{category.label}</option>
                        })
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        defaultValue={formObj.description}
                        onChange={(e)=>{onFormFieldChange("description", e.target.value)}}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number" 
                        required 
                        step="0.01" 
                        className="form-control" 
                        id="price" 
                        onChange={(e)=>{onFormFieldChange("price", e.target.value)}} 
                        value={formObj.price}
                    />
                </div>
                <button type="submit" className="btn bg-primary text-white">Save</button>
                <span onClick={()=>{onFormClose()}} className="btn bg-secondary text-white ml-2">Close</span>
            </form>
        )
    }

    return(
        <React.Fragment>
            {renderForm()}
            <div className="row" id="product-list">
                <div className="col-12 col-md-6">
                    <div className="border rounded-pill">
                        <div className="float-left mt-2 ml-3">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className="float-left">
                            <input 
                                type="text" 
                                className="form-control border-0" 
                                value={search}
                                id="search"
                                onChange={e => onSearch(e.target.value)}
                                placeholder="Search" 
                            />
                        </div>
                        <div className="clearfix" onClick={()=>{
                            document.getElementById("search").focus()
                        }}></div>
                    </div>
                </div>

                <div className="col-6 text-right d-none d-md-block">
                    <button 
                        disabled={(colClass === "col-12") ? "disabled": ""} 
                        onClick={()=>{setColClass("col-12")}}
                        className="border-0 text-white bg-primary rounded px-3 py-2"
                    >
                        <FontAwesomeIcon icon={faGripLines}/>
                    </button>
                    <button 
                        disabled={(colClass === "col-12") ? "": "disabled"} 
                        onClick={()=>{setColClass("col-md-6")}}
                        className="ml-2 border-0 text-white bg-primary rounded px-3 py-2"
                    >
                        <FontAwesomeIcon icon={faThLarge}/>
                    </button>
                </div>

                <div className="col-12 mt-2">
                    <button className="btn bg-primary text-white" onClick={()=>addItemHandle()}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />Add New
                    </button>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12 mt-4">
                    {getProductCount()}
                </div>
                {
                    products.map(function(product, i){
                        return <Product 
                                    key={product.id} 
                                    product={product} 
                                    colClass={colClass} 
                                    setModal={props.setModal} 
                                    onDeleteHandle={onDeleteHandle}
                                />
                    })
                }
            </div>
        </React.Fragment>
    )
}