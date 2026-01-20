import Match from "@/models/Match";

export const createMatch = (data) => {
  return Match.create(data);
};

export const findMatchById = (id) => {
  return Match.findById(id);
};

export const updateMatch = (id, data) => {
  return Match.findByIdAndUpdate(id, data, { new: true });
};

export const findMatchesByUser = (userId) => {
  return Match.find({ createdBy: userId }).sort({ createdAt: -1 });
};

export const getMatchById = async (id) => {
  return Match.findById(id);
};
