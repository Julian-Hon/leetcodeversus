import express from 'express'
import axios from 'axios'

const axios = require('axios');

const getDailyProblem = async () => {
  try {
    const response = await axios.get('https://alfa-leetcode-api.onrender.com/daily');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching daily problem:', error);
  }
};

getDailyProblem();