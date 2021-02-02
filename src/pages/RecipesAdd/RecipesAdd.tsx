import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RecipesContext } from '../../context/RecipesContext';

const RecipesAdd = () => {
  const { addRecipe } = useContext(RecipesContext);
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      image: null,
      name: '',
      description: '',
      videoURL: '',
    },
    validationSchema: yup.object({
      image: yup.string().required('Image is required'),
      name: yup.string().required("Don't forget to name your recipe"),
      description: yup
        .string()
        .required('Please add a little description of your recipe'),
      videoURL: yup.string().url('This is not a valid URL'),
    }),
    onSubmit: (values, actions) => {
      actions.resetForm();
      addRecipe({ ...values, steps: [], tags: [] }).then(() => {
        history.push('/recipes');
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="videoURL">Photo URL</label>
      <input
        id="image"
        name="image"
        type="file"
        onChange={(event) => {
          formik.setFieldValue('image', event.currentTarget.files![0]);
        }}
      />
      {formik.errors.image && formik.touched.image ? (
        <div>{formik.errors.image}</div>
      ) : null}
      <br />

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && formik.touched.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
      <br />

      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.errors.description && formik.touched.description ? (
        <div>{formik.errors.description}</div>
      ) : null}
      <br />

      <label htmlFor="videoURL">Video URL</label>
      <input
        id="videoURL"
        name="videoURL"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.videoURL}
      />
      {formik.errors.videoURL && formik.touched.videoURL ? (
        <div>{formik.errors.videoURL}</div>
      ) : null}
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipesAdd;
