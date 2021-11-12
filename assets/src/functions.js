'use-strict';

export const node = (selector, el = document) => {
	return el.querySelector(selector);
};
export const nodes = (selector, el = document) => {
	return el.querySelectorAll(selector);
};
