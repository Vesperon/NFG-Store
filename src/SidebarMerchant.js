import supabase from "./supabaseClient";
import { useEffect, useState } from "react";

const SidebarMerchant = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
       
                const { data: products } = await supabase
                    .from('product')
                    .select('product_category')
                    .eq('user_id', 16);
                    
                const uniqueCategories = new Set(products.map(product => product.product_category));
                setCategories(Array.from(uniqueCategories));
               
                console.log(categories);

                
    }

    return (
        <div>
            {categories.map((category, index) => (
                <h1 className="side py-1" key={index}>{category}</h1>
            ))}
        </div>
    );
}

export default SidebarMerchant;
