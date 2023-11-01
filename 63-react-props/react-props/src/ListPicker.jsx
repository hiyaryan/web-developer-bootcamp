export default function ListPicker({ nums = [], obj = {} }) {
    return (
        <>
            <p>A random {typeof nums[0]} from {nums}:
                {nums[Math.floor(Math.random() * nums.length)]}
            </p>
            {/* <p>Values from an object: {obj.a} {obj.b} {obj.c} {obj.d} */}
            {/* </p> */}
        </>
    )
}