import PropTypes from 'prop-types'
import React from 'react'

const CreateCourseContext = React.createContext({
  course: {
    thumbnail: '',
    price: 0,
    discount: 0,
    title: '',
    shortdesc: '',
    lectures: []
  },
  update: () => {}
})

export default function CreateCourseProvider({ children }) {
  const [course, update] = React.useState({
    thumbnail: '',
    price: 0,
    discount: 0,
    title: '',
    shortdesc: '',
    lectures: [
      {
        title:
          'Sit velit non laboris excepteur excepteur reprehenderit in deserunt qui elit minim aute. Mollit adipisicing commodo veniam enim reprehenderit cillum fugiat aliquip sunt. Aliqua minim et cillum duis anim veniam consectetur incididunt.',
        url: 'Aliquip pariatur velit est id esse sit aute reprehenderit laboris consectetur cillum sunt.',
        desc: 'Ullamco officia amet ut excepteur non cillum.',
        hour: 6,
        minute: 22,
        second: 35,
        preview: true
      },
      {
        title:
          'Commodo Lorem tempor cillum laboris excepteur in ut ea anim velit consectetur veniam eiusmod. Ex sit fugiat quis culpa labore reprehenderit mollit voluptate consectetur tempor exercitation aliquip cillum. Non labore aliqua reprehenderit dolor non ullamco pariatur enim sit nisi aliquip consequat sunt.',
        url: 'Eiusmod nisi sit reprehenderit adipisicing elit mollit consectetur veniam eiusmod veniam.',
        desc: 'Aliquip ipsum nulla officia ea officia sint amet nostrud voluptate.',
        hour: 15,
        minute: 11,
        second: 3,
        preview: false
      },
      {
        title:
          'Voluptate mollit amet et in incididunt. In et magna id veniam esse. Esse non labore fugiat ad nostrud laboris ad.',
        url: 'Minim ea do aliqua cupidatat mollit.',
        desc: 'Consequat mollit proident amet nostrud in enim.',
        hour: 7,
        minute: 35,
        second: 1,
        preview: true
      },
      {
        title:
          'Duis ipsum ullamco adipisicing ad tempor mollit Lorem. Mollit consectetur quis irure nisi eiusmod pariatur. Consectetur ea deserunt dolore eiusmod nisi incididunt.',
        url: 'Commodo dolor deserunt enim occaecat enim do.',
        desc: 'Excepteur eu ad esse culpa nisi exercitation do cupidatat pariatur minim pariatur excepteur.',
        hour: 18,
        minute: 22,
        second: 54,
        preview: false
      },
      {
        title:
          'Commodo magna velit qui consectetur irure. Quis veniam non eiusmod quis occaecat exercitation anim ex do esse occaecat aliqua non. Sint ullamco do adipisicing officia.',
        url: 'Irure irure occaecat reprehenderit est nulla in esse ut ad.',
        desc: 'Ipsum duis labore voluptate fugiat ipsum officia culpa ut.',
        hour: 1,
        minute: 36,
        second: 57,
        preview: true
      },
      {
        title:
          'Dolore sit Lorem minim eiusmod ex eu eu Lorem non non laborum aute. Do et laboris in et quis labore aliquip ullamco aliqua qui nisi in exercitation. Irure laborum nulla tempor ad dolore esse aliqua anim sint ad.',
        url: 'Irure ipsum est sunt magna velit velit pariatur non enim laborum proident.',
        desc: 'Velit ea est cillum nostrud nostrud.',
        hour: 21,
        minute: 15,
        second: 29,
        preview: false
      },
      {
        title:
          'Ut fugiat quis aliqua exercitation eiusmod quis veniam reprehenderit minim officia. Consectetur et cillum ea minim ullamco excepteur in id dolor amet qui ullamco. Nostrud reprehenderit do cillum aliqua laborum labore reprehenderit nulla ullamco.',
        url: 'Cillum sunt cupidatat elit enim deserunt consectetur amet voluptate enim qui minim in.',
        desc: 'Voluptate voluptate ad est ea adipisicing sint.',
        hour: 5,
        minute: 2,
        second: 5,
        preview: false
      },
      {
        title:
          'Nisi et eu pariatur mollit ad aliquip laboris occaecat dolore proident proident laborum. Ullamco enim reprehenderit sint anim mollit duis eu reprehenderit enim. Adipisicing deserunt duis do reprehenderit dolore duis Lorem adipisicing proident.',
        url: 'Est Lorem ipsum do esse anim fugiat tempor voluptate cillum.',
        desc: 'Dolor pariatur voluptate fugiat enim proident et veniam pariatur cillum excepteur officia non fugiat est.',
        hour: 19,
        minute: 33,
        second: 44,
        preview: false
      },
      {
        title:
          'Culpa do quis nostrud in ex labore. Laboris amet excepteur exercitation veniam nisi Lorem ipsum aliqua duis voluptate et proident ex. Esse proident eu sit duis sint dolore.',
        url: 'Laboris sint ex sunt sint exercitation nisi.',
        desc: 'Exercitation magna voluptate elit labore culpa sit proident sunt deserunt occaecat deserunt irure ullamco aliqua.',
        hour: 15,
        minute: 12,
        second: 23,
        preview: false
      },
      {
        title:
          'Consectetur minim velit officia dolore ex ut in in sit. Ipsum ullamco labore voluptate sint culpa. Elit adipisicing cillum proident laboris.',
        url: 'Excepteur officia elit ullamco laboris ea id et elit fugiat nostrud proident nostrud.',
        desc: 'Amet exercitation culpa irure occaecat minim velit enim non nulla proident.',
        hour: 14,
        minute: 58,
        second: 51,
        preview: false
      }
    ]
  })
  return (
    <CreateCourseContext.Provider
      value={{
        course,
        update: (props) => update((prev) => ({ ...prev, ...props }))
      }}
    >
      {children}
    </CreateCourseContext.Provider>
  )
}

export function useCreateCourse() {
  return React.useContext(CreateCourseContext)
}

CreateCourseProvider.propTypes = {
  children: PropTypes.node.isRequired
}
