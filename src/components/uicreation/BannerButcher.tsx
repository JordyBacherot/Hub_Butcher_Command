type BannerButcherProps = {
    village: string;
};

export default function BannerButcher({ village }: BannerButcherProps) {
    const villageLower = village.toLowerCase();

    const styles =
        villageLower === "mercurey"
            ? "bg-[#800020] text-white"
            : villageLower === "saint-remy"
                ? "bg-gray-300 text-gray-800"
                : "bg-black text-white";

    return (
        <div className={`h-12 flex items-center justify-center ${styles}`}>
            <span className="text-xl lg:text-2xl font-semibold">
                {village.charAt(0).toUpperCase() + village.slice(1).toLowerCase()}
            </span>
        </div>
    );
}
