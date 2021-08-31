import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";


const FormTodo = (props) => {
    return (
        <Formik
            initialValues={{
              description: props.description ,
              targetDate: props.targetDate ,
              completed: props.completed ,
            }}
            onSubmit={props.submitHandler}
            validate={props.validationHandler}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Is Completed?</label>
                  <Field as="select" className="form-control" name="completed">
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </Field>
                </fieldset>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </Form>
            )}
          </Formik>
    );
};

export default FormTodo;