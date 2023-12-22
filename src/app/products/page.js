import { ArrowOutward } from "@mui/icons-material";
import { AspectRatio, Button, Card, CardContent, CardOverflow, Chip, Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
    return (
        <div className="flex flex-row w-full h-full justify-center items-start gap-2 p-4" >
            <div id="filterPart" className="w-1/6 h-96 border-asliLight rounded-xl border-2 border-solid p-3" >
                <div className="w-full flex flex-row justify-between items-center" >
                    <span className="text-xl" > فیلتر ها </span>
                    <button className="text-sm text-khas" > حذف فیلتر </button>
                </div>
            </div>
            <div id="productsPart" className="flex flex-row justify-start items-center flex-wrap w-5/6" >

                <Link href="/" className="w-full h-full" >
                    <Card className="md:w-1/4 w-full h-full hover:shadow-2xl">
                        <CardOverflow>
                            <AspectRatio >
                            <Image
                                src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
                                loading="lazy"
                                fill
                                alt=""
                            />
                            
                            </AspectRatio>
                        </CardOverflow>
                        <CardContent>
                            <Typography level="body-xs">Bluetooth Headset</Typography>
                            <Link
                            href="#product-card"
                            fontWeight="md"
                            color="neutral"
                            textColor="text.primary"
                            overlay
                            endDecorator={<ArrowOutward />}
                            >
                            Super Rockez A400
                            </Link>

                            <Typography
                            level="title-lg"
                            sx={{ mt: 1, fontWeight: 'xl' }}
                            endDecorator={
                                <Chip component="span" size="sm" variant="soft" color="success">
                                Lowest price
                                </Chip>
                            }
                            >
                            2,900 THB
                            </Typography>
                            <Typography level="body-sm">
                            (Only <b>7</b> left in stock!)
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>

            </div>
            
        </div>
    );
}

export default Products;