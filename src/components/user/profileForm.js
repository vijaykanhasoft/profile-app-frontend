import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button,
  notification,
  Checkbox 
} from 'antd';
import {
  Form,
  Input,
  SubmitButton,
  Select
} from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';

const ProfileForm = (props) => {
  const history = useHistory();
  const { updateProfile, getProfileList } = props;
  const { TextArea } = Input;
  const tempNewExperience = {
    company: '',
    role: '',
    start_date: '',
    end_date: '',
    description: '',
    current_job: false
  }
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    tagline: '',
    skills: [],
    experience: [tempNewExperience]
  })
  const [experience, setExperience] = useState([tempNewExperience])

  useEffect(()=>{
    if(updateProfile){
      const test = updateProfile.experience
      setExperience(test)
    }
  },[updateProfile])

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format!').required('Email is required'),
    tagline: Yup.string().required('Tagline is required'),
    skills: Yup.array().min(1).required(),
    // experience: Yup.array().of(
    //   Yup.object().shape({
    //     company: Yup.string().required("Company Name is required"),
    //     role: Yup.string().required("Role is required"),
    //     start_date: Yup.string().required("Start date is required"),
    //     end_date: Yup.string().required("End date is required"),
    //     description: Yup.string().required("Description is required"),
    //   })
    // )
  })

  const saveProfile = (values) => {
    let profileData = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : [];
    const profileKey = updateProfile ? profileData.findIndex(p => p.email === updateProfile.email) : -1;
    if (profileKey >= 0) {
      profileData[profileKey].firstName = values.firstName;
      profileData[profileKey].lastName = values.lastName;
      profileData[profileKey].email = values.email;
      profileData[profileKey].tagline = values.tagline;
      profileData[profileKey].experience = values.experience;
      profileData[profileKey].skills = values.skills;
      localStorage.setItem("profileData", JSON.stringify(profileData));
      if(updateProfile){
        history.push("/");
      } else {
        getProfileList();
      }
      return true;
    } else {
      if (profileData.find((obj) => obj.email.trim() === values.email.trim())) {
        notification.error({
          message: 'Email is already exists',
          description:
            'This email is already registered, please try with another email address. ',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });      
        return false;
      }
      profileData.push({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        tagline: values.tagline,
        experience: values.experience,
        skills: values.skills
      })
      localStorage.setItem("profileData", JSON.stringify(profileData));
      if(updateProfile){
        history.push("/");
      } else {
        getProfileList();
      }
      return true;
    }
  }

  const addExperience = () => {
    let tempArray = [...experience, tempNewExperience];
    setExperience(tempArray);
  }

  const onChangeCheckBox = (e, key, obj)=>{
    let tempExp = experience
    obj.current_job = e.target.checked    
    tempExp[key] = obj
    setExperience(JSON.parse(JSON.stringify(tempExp)));
  }

  const listExperiences = () => {
    return experience.map((obj, index) => {
      return (
        <div key={index}>
          <Input name={`experience[${index}].company`} placeholder='Company Name' className='experience-item'/>
          <span className='error-message'><ErrorMessage name={`experience[${index}].company`} /></span>
          <Input name={`experience[${index}].role`} placeholder='role' className='experience-item'/>
          <span className='error-message'><ErrorMessage name={`experience[${index}].role`} /></span>
          <Input name={`experience[${index}].start_date`} placeholder='start date' type="date" className='experience-item'/>
          <span className='error-message'><ErrorMessage name={`experience[${index}].start_date`} /></span>
          <Input name={`experience[${index}].end_date`} placeholder='end_date' type="date" className='experience-item' />
          <span className='error-message'><ErrorMessage name={`experience[${index}].end_date`} /></span>
          <TextArea showCount maxLength={300} name={`experience[${index}].description`}
            placeholder='Description' className='experience-item' />
          <span className='error-message'><ErrorMessage name={`experience[${index}].description`} /></span>
          <Input type="checkbox" name={`experience[${index}].current_job`} placeholder='Current job' className='experience-item' checked={experience[index].current_job?true:false} onChange={(e, index)=>onChangeCheckBox(e, index, obj)} /> Current job
          <br></br>
        </div>
      )
    })
  }

  return (
    <>
      <Formik
        initialValues={updateProfile ? updateProfile : initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => saveProfile(values)}
      >
        {(formik) => {
          return (
            <Form>
              <Form.Item name='firstName' label="First Name">
                <Input name='firstName' placeholder='First name' />
              </Form.Item>
              <Form.Item name='lastName' label="Last Name">
                <Input name='lastName' placeholder='Last name' />
              </Form.Item>
              <Form.Item name='email' label="Email">
                <Input name='email' placeholder='email' />
              </Form.Item>
              <Form.Item name='tagline' label="Tagline">
                <TextArea showCount maxLength={100} name='tagline' placeholder='Tagline' />
              </Form.Item>
              <Form.Item name='skills' label="Skills">
                <Select mode="tags" name="skills" placeholder="Skills"></Select>
              </Form.Item>
              <Form.Item name='experiences' label="Experiences">
                {listExperiences()}
                <Button key="back" type='primary' onClick={addExperience}>
                  Add more experience
                </Button>
              </Form.Item>
              <SubmitButton type='submit' disabled={false}>Save</SubmitButton>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
export default ProfileForm;