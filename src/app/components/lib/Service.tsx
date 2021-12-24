import React from 'react';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { Flex, Button, Text } from '../primitives/primitives';
import { ContentType } from '../../data/initContent';
import SNavLink from '../primitives/NavLink';

type ServiceProps = { item: ContentType; remove: (id: string) => void };

export default function Service({ item, remove }: ServiceProps) {
    const onRemove = (e: React.SyntheticEvent) => remove(e.currentTarget.id);

    return (
        <Flex key={item.id} gap='40px' alignItems='center'>
            <Flex gap='10px'>
                <Text>{item.service}</Text>
                <Text>{item.amount}</Text>
            </Flex>

            <Flex gap='10px'>
                <Button
                    variant='cancel' fontSize='18px' onClick={onRemove}
                    id={item.id}
                >
                    X
                </Button>
                <Button id={item.id}>
                    <SNavLink to={`/services/${item.id}`}>
                        <AiFillEdit />
                    </SNavLink>
                </Button>
            </Flex>
        </Flex>
    );
}

// export default function Observe({ contentState, apiMethod }: ObserveProps) {
//     const params = useParams();
//     const navigate = useNavigate();

//     const item = contentState.find((dItem) => dItem.id === params.postId);
//     if (!item) return <div>Error</div>;

//     const onClick = () => {
//         apiMethod(item.id);
//         navigate('/');
//     };

//     return (
//         <Box
//             bg='red' variant='layout' p='70px'
//             borderRadius='100px' position='relative'
//         >
//             <AbsoluteBox right={-10} top={-10}>
//                 <BackButton>{'<<<'}</BackButton>
//             </AbsoluteBox>
//             <Post postData={item} />
//             <Flex justifyContent='flex-end' gap='10px'>
//                 <Button variant='boxButton' bg='hint'>
//                     <SNavLink to={`/posts/edit/${item.id}`}>Изменить</SNavLink>
//                 </Button>
//                 <Button variant='boxButton' bg='darkred' onClick={onClick}>
//                     Удалить
//                 </Button>
//             </Flex>
//         </Box>
//     );
// }
