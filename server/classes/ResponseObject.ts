import { Response } from 'express';


interface ServerResponse {
  status: "success" | "fail";
  payload: any;
}

export default class ResponseObject {
  static success(res: Response, payload: any): Response {
    const serverResponse: ServerResponse = { status: 'success', payload };

    return res.json(serverResponse);
  }

  static fail(res: Response, payload: any): Response {
    const serverResponse: ServerResponse = { status: 'fail', payload };

    return res.json(serverResponse);
  }
}
