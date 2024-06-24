import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getAllColors = async () => {
    const response = await axios.get(`${base_url}color`);
    if (response.data) {
        return response.data;
    }
};

export const colorService = {
    getAllColors
};
