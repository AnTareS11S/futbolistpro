/* eslint-disable react/prop-types */
import MyDatePicker from './MyDatePicker';
import SelectData from './SelectData';
import { Checkbox } from './ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';

const FormArea = ({
  label,
  type,
  fileRef,
  currentUserPhoto,
  form,
  name,
  idFlag,
  items,
  time,
  setFile,
  placeholder,
  defaultValue,
  uploadProgress,
  isDisabled,
  styles,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex flex-col w-full '>{label}</FormLabel>
          <FormControl>
            {type === 'file' ? (
              <div className='flex flex-col items-center'>
                {name === 'logo' || name === 'postPhoto' ? (
                  ''
                ) : (
                  <img
                    src={
                      currentUserPhoto ||
                      'https://firebasestorage.googleapis.com/v0/b/futbolistapro.appspot.com/o/avatars%2Fblank-profile-picture-973460_960_720.webp?alt=media&token=5779eb88-d84b-46f3-bef6-3c2648a8fc9c'
                    }
                    alt='user'
                    className='w-44 h-44 rounded-full object-contain mt-2 self-center mx-auto cursor-pointer ring-2 ring-white hover:ring-primary-500 transition duration-300'
                    onClick={() => fileRef.current.click()}
                  />
                )}
                <Input
                  id={name}
                  type={type}
                  className={
                    name === 'logo' || name === 'postPhoto'
                      ? 'w-full'
                      : 'hidden'
                  }
                  ref={fileRef}
                  accept='image/*'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Progress value={uploadProgress} className='mt-5' />
              </div>
            ) : type === 'textarea' ? (
              <Textarea
                id={name}
                placeholder={placeholder}
                rows={name === 'postContent' ? 15 : 1}
                className='resize-none w-full ring-2 ring-white hover:ring-primary-500 transition duration-300'
                {...form.register(name)}
                {...field}
              />
            ) : type === 'select' ? (
              <SelectData
                id={name}
                items={items}
                defaultValue={defaultValue}
                placeholder={placeholder}
                idFlag={idFlag}
                onChange={field.onChange}
              />
            ) : type === 'date' ? (
              <MyDatePicker
                id={name}
                selected={field.value || placeholder}
                onChange={field.onChange}
                time={time}
              />
            ) : type === 'checkbox' ? (
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                className='w-8 h-8 justify-center'
              />
            ) : (
              <Input
                {...field}
                id={name}
                type={type}
                className={
                  styles
                    ? `${styles} ring-2 ring-white hover:ring-primary-500 transition duration-300 bg-white`
                    : 'w-full ring-2 ring-white hover:ring-primary-500 transition duration-300 bg-white'
                }
                disabled={isDisabled}
                placeholder={placeholder}
                {...form.register(name)}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormArea;
