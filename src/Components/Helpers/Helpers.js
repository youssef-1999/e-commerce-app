
function Helpers() {
  return (
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  )
}

export default Helpers
