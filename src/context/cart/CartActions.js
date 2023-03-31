export const AddProduct = (product) => ({
    type: "ADD_PRODUCT",
    payload: product
});
  
export const RemoveProduct = (product) => ({
    type: "REMOVE_PRODUCT",
    payload: product,
});