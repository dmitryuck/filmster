export default interface ServerResponse {
  status: "success" | "fail";
  payload: any;
}
