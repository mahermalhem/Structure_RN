import {  horizontalScale as s } from "./dimensionsUnits";

export const m = (margin) => {
  return {
    margin: s(margin),
  };
};
  
export const mt = (margin) => {
  return {
    marginTop: s(margin),
  };
};
  
export const mb = (margin ) => {
  return {
    marginBottom: s(margin),
  };
};
  
export const ms = (margin ) => {
  return {
    marginStart:  s(margin),
  };
};
  
export const mh = (margin ) => {
  return {
    marginHorizontal:  s(margin),
  };
};
  
export const mv = (margin ) => {
  return {
    marginVertical:  s(margin),
  };
};
  
export const p = (padding ) => {
  return {
    padding:  s(padding),
  };
};
export const pb = (padding ) => {
  return {
    paddingBottom:  s(padding),
  };
};
export const pt = (padding ) => {
  return {
    paddingTop:  s(padding),
  };
};
export const pl = (padding ) => {
  return {
    paddingLeft:  s(padding),
  };
};
export const pr = (padding ) => {
  return {
    paddingRight:  s(padding),
  };
};
  
export const flex = (flex ) => {
  return {
    flex: flex,
  };
};