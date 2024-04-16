/**
 * Retrieve the object for a specific type from an object.
 * @param {TypesObject} typesObj - Object containing type properties as TypeDetails objects.
 * @param {ITransitionType} type - The type of value to retrieve.
 * @returns {any} - The object associated with the type, or an empty object if not found.
 */
export function getObjectByType(typesObj: ITypesObject, type: ITransitionType): any {
	return typesObj[type as keyof ITypesObject];
}
