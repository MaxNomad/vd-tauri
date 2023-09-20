import PropTypes from 'prop-types';

// material-ui
import {
  Box,
  Button,
  Drawer,
  Grid,
  Typography,
  Autocomplete,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  InputLabel,
  FormHelperText,
  Stack,
  Divider,
  Tooltip
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// third party
import * as yup from 'yup';
import { Chance } from 'chance';
import { useFormik } from 'formik';

// project imports
import UploadMultiFile from '@components/third-party/dropzone/MultiFile';
import AnimateButton from '@components/@extended/AnimateButton';
import { openSnackbar } from '@store/reducers/snackbar';
import { useDispatch, useSelector } from 'store';
import { addItem } from '@store/reducers/kanban';

import IconButton from '@components/@extended/IconButton';
import { CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';

const chance = new Chance();
const validationSchema = yup.object({
  title: yup.string().required('Task title is required'),
  dueDate: yup.date().required('Due date is required').nullable()
});

// ==============================|| KANBAN BACKLOGS - ADD ITEM ||============================== //

const AddItem = ({ open, handleDrawerOpen, storyId }) => {
  const dispatch = useDispatch();
  const { profiles, columns, userStory, items } = useSelector((state) => state.kanban);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      assign: null,
      priority: 'low',
      dueDate: null,
      description: '',
      commentIds: '',
      image: false,
      storyId: '',
      columnId: columns[0].id,
      files: []
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const item = {
        id: values.id || `${chance.integer({ min: 1000, max: 9999 })}`,
        title: values.title,
        assign: values.assign,
        priority: values.priority,
        dueDate: values.dueDate ? new Date(values.dueDate) : new Date(),
        description: values.description,
        commentIds: values.commentIds,
        image: values.image
      };
      dispatch(addItem(values.columnId, columns, item, items, storyId, userStory));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      handleDrawerOpen();
      resetForm();
    }
  });

  return (
    <Drawer
      sx={{
        ml: open ? 3 : 0,
        flexShrink: 0,
        zIndex: 1200,
        overflowX: 'hidden',
        width: { xs: 320, md: 450 },
        '& .MuiDrawer-paper': {
          height: '100vh',
          width: { xs: 320, md: 450 },
          position: 'fixed',
          border: 'none',
          borderRadius: '0px'
        }
      }}
      variant="temporary"
      anchor="right"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      {open && (
        <>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">Add Task</Typography>
              <Tooltip title="Close">
                <IconButton color="secondary" onClick={handleDrawerOpen} size="small" sx={{ fontSize: '0.875rem' }}>
                  <CloseOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 3 }}>
            <form onSubmit={formik.handleSubmit}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Title</InputLabel>
                      <TextField
                        fullWidth
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Assign to</InputLabel>
                      <Autocomplete
                        id="assign"
                        value={profiles.find((profile) => profile.id === formik.values.assign) || null}
                        onChange={(event, value) => {
                          formik.setFieldValue('assign', value?.id);
                        }}
                        options={profiles}
                        fullWidth
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option) => option.id === formik.values.assign}
                        renderOption={(props, option) => (
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <Image width={20} height={20} loading="lazy" src={`/assets/images/users/${option.avatar}`} alt="" />
                            {option.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Choose a assignee"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password' // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Prioritize</InputLabel>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-label="color"
                          value={formik.values.priority}
                          onChange={formik.handleChange}
                          name="priority"
                          id="priority"
                        >
                          <FormControlLabel value="low" control={<Radio color="primary" sx={{ color: 'primary.main' }} />} label="Low" />
                          <FormControlLabel
                            value="medium"
                            control={<Radio color="warning" sx={{ color: 'warning.main' }} />}
                            label="Medium"
                          />
                          <FormControlLabel value="high" control={<Radio color="error" sx={{ color: 'error.main' }} />} label="High" />
                        </RadioGroup>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Due date</InputLabel>
                      <DesktopDatePicker
                        value={formik.values.dueDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          formik.setFieldValue('dueDate', date);
                        }}
                        renderInput={(props) => (
                          <TextField
                            name="dueDate"
                            fullWidth
                            {...props}
                            placeholder="Due Date"
                            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                            helperText={formik.touched.dueDate && formik.errors.dueDate}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Description</InputLabel>
                      <TextField
                        fullWidth
                        id="description"
                        name="description"
                        multiline
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>State</InputLabel>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <Select
                          id="columnId"
                          name="columnId"
                          displayEmpty
                          value={formik.values.columnId}
                          onChange={formik.handleChange}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {columns.map((column, index) => (
                            <MenuItem key={index} value={column.id}>
                              {column.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <InputLabel sx={{ mt: 0.5 }}>Attachments:</InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <UploadMultiFile
                          type="STANDARD"
                          showList={true}
                          setFieldValue={formik.setFieldValue}
                          files={formik.values.files}
                          error={formik.touched.files && !!formik.errors.files}
                        />
                      </Grid>
                      {formik.touched.files && formik.errors.files && (
                        <Grid item xs={12}>
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {formik.errors.files}
                          </FormHelperText>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button fullWidth variant="contained" type="submit">
                        Save
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </form>
          </Box>
        </>
      )}
    </Drawer>
  );
};
AddItem.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
  storyId: PropTypes.string
};
export default AddItem;
