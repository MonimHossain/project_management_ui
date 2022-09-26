import React from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getApi = async (url, params=null) => {
    const response = await fetch(baseUrl+url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
        },
        params: params,
    })
    .then((response) => response.json())
    .then((data) => {
        return data
    });
    return response;
}

export const postApi = async (url, data) => {
    const response = await fetch(baseUrl+url, {
        method: 'POST',  
        headers: {
            Accept: '/',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
        }, 
        body:JSON.stringify(data)
      }).then((res) => res.json())
      .then((data) => {
          return data
      });
    return response;
}

export const postApiWithoutContentType = async (url, data) => {
    const response = await fetch(baseUrl+url, {
        method: 'POST',  
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
        }, 
        body: data
      }).then((res) => res.json())
      .then((data) => {
          return data
      });
    return response;
}

export const deleteApi = async (url, data) => {
    const response = await fetch(baseUrl+url, {
        method: 'DELETE',  
        headers: {
            Accept: '/',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
        }, 
        body:JSON.stringify(data)
      }).then((res) => res.json())
      .then((data) => {
          return data
      });
    return response;
}