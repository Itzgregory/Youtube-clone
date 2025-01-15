import { apiClient, videoBase } from '../config/config'; 
import { video, User } from '../../interface/index'; 

export const uploadVideo = async ({
  formData,
  config
}: {
  formData: FormData;
  config: { onUploadProgress: (ProgressEvent: any) => void };
}) => {
  try {
    const res = await apiClient.post(`${videoBase}/upload`, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video. Please try again.");
  }
};

export const updateVideo = async ({
  videoId,
  ...payload
}: {
  videoId: string;
} & video) => {
  try {
    const res = await apiClient.patch(`${videoBase}/${videoId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error updating video:", error);
    throw new Error("Failed to update video. Please try again.");
  }
};

export const getVideos = async () => {
  try {
    const res = await apiClient.get(videoBase);
    return res.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Failed to fetch videos. Please try again.");
  }
};

export const getVideoProperties = async (videoId: string | string[] | undefined) => {
  try {
    const res = await apiClient.get(`${videoBase}/${videoId}`);
    return res.data as video; 
  } catch (error) {
    console.error(`Error fetching video properties for video ID: ${videoId}`, error);
    throw new Error("Failed to fetch video properties. Please try again.");
  }
};


export const updateVideoViews = async (videoId: string | string[] | undefined) => {
  try {
    const res = await apiClient.patch(`${videoBase}/views/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error updating video views:", error);
    throw new Error("Failed to update video views. Please try again.");
  }
};

export const getVideosByUser = async (user: string) => {
  try {
    const res = await apiClient.post(`${videoBase}/myvideos/`, { userId: user });
    return res.data as video[]; 
  } catch (error) {
    console.error("Error fetching videos by user:", error);
    throw new Error("Failed to fetch videos by user. Please try again.");
  }
};


export const deleteVideoById = async (videoId: string) => {
  try {
    const res = await apiClient.delete(`${videoBase}/delete`, { data: { videoId } });
    return res.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw new Error("Failed to delete video. Please try again.");
  }
};


export const updateLikeIdVideo = async ({
  videoId,
  user
}: {
  videoId: string | string[] | undefined;
  user: User;
}) => {
  try {
    const res = await apiClient.patch(`${videoBase}/like/${videoId}`, { userId: user._id });
    return res.data;
  } catch (error) {
    console.error("Error updating like status for video:", error);
    throw new Error("Failed to update like status. Please try again.");
  }
};


export const updatePublishedVideo = async ({
  videoId,
  published
}: {
  videoId: string;
  published: boolean;
}) => {
  try {
    const res = await apiClient.patch(`${videoBase}/published/update`, { videoId, published });
    return res.data;
  } catch (error) {
    console.error("Error updating video published status:", error);
    throw new Error("Failed to update video published status. Please try again.");
  }
};
