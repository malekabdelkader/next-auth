import React, { FormEvent, FormEventHandler, FormHTMLAttributes, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

type FormProps = {
  inputs: {
    type: string;
    placeholder: string;
    id: string;
    values?: any[];
  }[];
  submitBtnText: string;
  onSubmit: (user: any) => void;
  redirect: { text: string; url: string };
};

const AuthLayout: React.FC<FormProps> = ({
  inputs,
  submitBtnText,
  onSubmit,
  redirect,
}) => {
  const initialValues: any = {}; // marking as any, as it's not sure beforehand how many inputs will come
  inputs
    .filter((inputData) => inputData.id) // don't add to form if id not set
    .forEach((inputData) => {
      initialValues[inputData.id] = "";
    });
  const [formState, setFormState] = useState(initialValues);
  const [isLoading, setisLoading] = useState<boolean>(false);

  /**
   * Handle submit of form. Send to actionURL and pass response/ error to handleActionUrlResponse
   * @param evt
   */
  const handleSubmit = (evt:FormEvent<HTMLFormElement> ) => {
    evt.preventDefault();
    setisLoading(true);
    onSubmit(formState);
    setisLoading(false);
  };

  /**
   * Handle Change of input elements (automatically update the formValueState)
   * @param evt
   */
  // inputs
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [evt.target.id]: evt.target.value });
  };

  
  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: " 1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        {submitBtnText} to Benefit from user Features
                      </h5>
                      {inputs
                        .filter((inputData) => inputData.id)
                        .map((inputData) => (
                          <div key={inputData.id} className="form-outline mb-4">
                            <input
                              id={inputData.id}
                              type={inputData.type}
                              placeholder={inputData.placeholder}
                              onChange={handleInputChange}
                              value={formState[inputData.id]}
                              className="form-control form-control-lg"
                            />
                          </div>
                        ))}

                      <div className="pt-1 mb-4">
                        <button
                          disabled={isLoading}
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          
                        >
                          {submitBtnText}
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      {redirect && (
                        <Link href={redirect.url}>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            {redirect.text}
                          </p>
                        </Link>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
