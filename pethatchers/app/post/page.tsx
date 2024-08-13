"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import getImageUrl from '@/services/getImageUrl';
import PushPet from '@/services/postDB';
import { useRouter } from 'next/navigation';

interface PetInfo {
    imageUrl: string;
    name: string;
    variant: string;
    demand: string;
    stability: string;
    value: { date: string; value: string }[];
    category: string;
    rap: string;
    exist: string;
}

export default function Post() {

  const router = useRouter();
  const [valuePair, setValuePair] = useState({ date: '', value: '' });
  const [petInfo, setPetInfo] = useState<PetInfo>({
    imageUrl: '',
    name: '',
    variant: '',
    demand: '',
    stability: '',
    value: [],
    category: '',
    rap: '',
    exist: '',
  });

//updating the date and value on change
const updateValuePair = (key: string, value: string) => {
    setValuePair({ ...valuePair, [key]: value });
}

const setImageUrl = async (file: File) => {
    const url = await getImageUrl(file);
    setPetInfo({ ...petInfo, imageUrl: url });
}

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pet Information Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={(e:any)=>setImageUrl(e.target.files[0])}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter pet name" onChange={(e)=>setPetInfo({...petInfo,name:e.target.value})}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variant">Variant</Label>
            <Input id="variant" placeholder="Enter variant"  onChange={(e)=>setPetInfo({...petInfo,variant:e.target.value})}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demand">Demand</Label>
            <Input id="demand" placeholder="Enter demand" onChange={(e)=>setPetInfo({...petInfo,demand:e.target.value})}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stability">Stability</Label>
            <Input id="stability" placeholder="Enter stability"  onChange={(e)=>setPetInfo({...petInfo,stability:e.target.value})}/>
          </div>

          <div className="space-y-2">
            <Label>Value</Label>
              <div className="flex space-x-2">
                <Input
                  type="date"
                  onChange={(e) => updateValuePair ('date', e.target.value)}
                />
                <Input
                  placeholder="Value"
                  onChange={(e) => updateValuePair('value', e.target.value)}
                />
              </div>
            <Button type="button" variant="outline" onClick={(e)=>{
                e.preventDefault();
                setPetInfo({...petInfo,value:[...petInfo.value,valuePair]});
                setValuePair({date:'',value:''});
                alert('Value Pair Added');
            }}>
              Add Value Pair
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(e)=>setPetInfo({...petInfo,category:e})}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category1">Category 1</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
                <SelectItem value="category3">Category 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rap">RAP</Label>
            <Input id="rap" placeholder="Enter RAP" onChange={(e)=>setPetInfo({...petInfo,rap:e.target.value})}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exist">Exist</Label>
            <Input id="exist" placeholder="Enter EXIST" onChange={(e)=>setPetInfo({...petInfo,exist:e.target.value})}/>
          </div>

          <Button type="submit" onClick={(e)=>{
            e.preventDefault();
            PushPet(petInfo);
            setPetInfo({
              imageUrl: '',
              name: '',
              variant: '',
              demand: '',
              stability: '',
              value: [],
              category: '',
              rap: '',
              exist: '',
            });
            router.push('/post');
          }}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}