export const updateObject = (oldObject, updatedProperties) => {
  return { //a new object, that's the whole idea here!
    ...oldObject,
    ...updatedProperties
  };
}