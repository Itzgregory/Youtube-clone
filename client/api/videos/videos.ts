import { apiClient, videoBase } from '../config/config';
import {video} from '../../interface/index'

export const getVideos = async (): Promise<video[]> => {
  try {
    const res = await apiClient.get(videoBase);
    return res.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export const getVideoPropertys = async (videoId: string | string[] | undefined) => {
  try {
    const res = await apiClient.get(`${videoBase}/${videoId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching video properties:', error);
    throw error;
  }
};

export const getVideosByuser = async (userId: string) => {
  try {
    const res = await apiClient.get(`${videoBase}/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user videos:', error);
    return [];
  }
};

export const videosApi = {
  getAll: getVideos,
  getById: getVideoPropertys,
  getByUser: getVideosByuser,
};