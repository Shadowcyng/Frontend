import { PRODUCT_LIST_REQUEST,
         PRODUCT_LIST_SUCCESS,
         PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL,
         PRODUCT_SAVE_REQUEST,
         PRODUCT_SAVE_SUCCESS,
         PRODUCT_SAVE_FAIL,
         PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_DELETE_FAIL

    } from '../../type'
import axios from 'axios'

//get PRoducts
export const listProducts = () => async (dispatch) => {
    try{
    dispatch({ type : PRODUCT_LIST_REQUEST });
        const { data } =  await axios.get('/products');
            dispatch( {
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            } );
    }
    catch(error){
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        });
    }
}

//get Product details
export const detailsProduct = (productId) => async (dispatch) =>{
    try{
        dispatch({ 
            type: PRODUCT_DETAILS_REQUEST,
            payload: productId  
         })
        const { data } = await axios.get(`/products/product/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })   
    }catch(error){
      dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.message
      })  
    }
}

//Save product
export const saveProduct = ( product ) => async (dispatch, getState) =>{
    try {
        dispatch({ type : PRODUCT_SAVE_REQUEST, payload : product });
        const { user : { userInfo } } = getState()
        const token = userInfo.token
        if(!product._id){            
            const { data } = await axios.post( '/products/product',product, {headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        dispatch( { type: PRODUCT_SAVE_SUCCESS, payload: data } )
        }else{
            const { data } = await axios.put( `/products/product/${product._id}`, product, {headers: {
                'Authorization' : `Bearer ${token}`
            }
            
        });
        dispatch( { type: PRODUCT_SAVE_SUCCESS, payload: data } )  
    }
    } catch (error) {
         dispatch({ type : PRODUCT_SAVE_FAIL, payload : error })
    }
}
//Delete product
export const deleteProduct = ( productId ) => async (dispatch, getState) =>{
    try {
        dispatch({ type : PRODUCT_DELETE_REQUEST, payload : productId });
        const { user : { userInfo } } = getState()
        const token = userInfo.token           
            const { data } = await axios.delete( `/products/product/${productId}`, {headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        dispatch( { type: PRODUCT_DELETE_SUCCESS, payload: data } )
        
    } catch (error) {
         dispatch({ type : PRODUCT_DELETE_FAIL, payload : error })
    }
}




