import { Wrapper,Title,Label,Input,Item,Button,Text } from "./Contacts.styled"
import{TiUserDelete} from'react-icons/ti'
import PropTypes from 'prop-types'; 
import { removeContact, filter,} from "redux/ContactsSlice/contactSlice";
import { useSelector,useDispatch } from "react-redux";

export const Contacts = () => {
    const contacts = useSelector(state => state.contact.items);
    const dispatch = useDispatch();

    const queryFilterContacts = useSelector(state => state.contact.filter);
    const onFilterContacts = (e) => {

        const name = e.currentTarget.value
        dispatch(filter(name));
        
    }

    const getVisibleContact = () => {
        const normalizeFilter = queryFilterContacts.toLowerCase().trim();
        return contacts.filter(contact => (contact.name.toLowerCase().includes(normalizeFilter)))
    };

  const visibleContacts=getVisibleContact();



    return (
   
        <Wrapper>
          

            <Title>Contacts</Title>

          
              
           <Label htmlFor='find'>Find contacts by name</Label>
            <Input id="find" type="text"
                onChange={onFilterContacts}

            />
            <ul>

                {visibleContacts && visibleContacts.map(({id,name,number })=> (
                    <Item key={id}>
                        <Text>{name}: {number}</Text>
                        <Button type="button"
                            onClick={() => dispatch(removeContact(id))}
                        ><TiUserDelete
                            color="#763f33"
                            size={22}>
                            </TiUserDelete>
                        </Button>
                    </Item>
                   
                ))}

            </ul>
    </Wrapper>
)

   
    }


Contacts.prototype = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        
        id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number:PropTypes.string.isRequired
    })),

    
  
}